const titleValue = document.getElementById('titleValue');
const descriptionValue = document.getElementById('descriptionValue');
const copyTitleBtn = document.getElementById('copyTitleBtn');
const copyDescriptionBtn = document.getElementById('copyDescriptionBtn');
const copyBothBtn = document.getElementById('copyBothBtn');
const card = document.querySelector('.card');

function setButtonFeedback(button, originalText) {
  button.textContent = 'Copied!';
  button.classList.add('copied');

  setTimeout(() => {
    button.textContent = originalText;
    button.classList.remove('copied');
  }, 1200);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error('Clipboard write failed:', error);
  }
}

async function loadMetaData() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab?.id) {
      titleValue.textContent = 'Unable to access this page';
      descriptionValue.textContent = 'No meta description found';
      return;
    }

    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const title = document.title || '';
        const descriptionTag = document.querySelector('meta[name="description"]');
        const description = descriptionTag ? descriptionTag.getAttribute('content') || '' : '';

        return {
          title,
          description: description || 'No meta description found'
        };
      }
    });

    const data = results[0]?.result;

    if (!data) {
      titleValue.textContent = 'Unable to access this page';
      descriptionValue.textContent = 'No meta description found';
      return;
    }

    titleValue.textContent = data.title || 'No title found';
    descriptionValue.textContent = data.description || 'No meta description found';
    card.classList.add('loaded');
  } catch (error) {
    console.error('Failed to read page metadata:', error);
    titleValue.textContent = 'Unable to access this page';
    descriptionValue.textContent = 'No meta description found';
  }
}

copyTitleBtn.addEventListener('click', async () => {
  const text = titleValue.textContent;
  await copyText(text);
  setButtonFeedback(copyTitleBtn, 'Copy');
});

copyDescriptionBtn.addEventListener('click', async () => {
  const text = descriptionValue.textContent;
  await copyText(text);
  setButtonFeedback(copyDescriptionBtn, 'Copy');
});

copyBothBtn.addEventListener('click', async () => {
  const text = `Title: ${titleValue.textContent}\nDescription: ${descriptionValue.textContent}`;
  await copyText(text);
  setButtonFeedback(copyBothBtn, 'Copy Both');
});

loadMetaData();
