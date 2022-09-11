// To select both 'Select Tag'

const fromText = document.querySelector('.from-text'),
    toText = document.querySelector('.to-text'),
    exchangeIcon = document.querySelector('.exchange'),
    selectTag = document.querySelectorAll("select"),
    translationBn = document.querySelector("button"),
    icons = document.querySelectorAll(".row i"); 

selectTag.forEach((tag, id) => {
    // console.log(tag)

    // selecting English by default as FROM language
    // And Hindi as TO language
    for (const country_code in countries) {

        let selected;
        if (id == 0 && country_code == "en-GB") {
            selected = "selected";
        } else if (id == 1 && country_code == "hi-IN") {
            selected = "selected";
        }

        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
        tag.insertAdjacentHTML('beforeend', option); // adding option tag inside tag tag
    }
});

// EXCHANGE ICON

exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value; // for Exchanging direct translation
    let tempLang = selectTag[0].value; // for Exchanging selected languages 
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
})


// TRANSLATE BUTTON

translationBn.addEventListener("click", () => {
    let text = fromText.value;  // not 'values' it's value otherwise it'll show undefined
    translateFrom = selectTag[0].value, // getting fromSelectTag value
        translationTo = selectTag[1].value; // getting toSelectTag value
    // console.log(text, translateFrom, translationTo)

    toText.setAttribute("placeholder", "Translating....");
    let apiURL = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translationTo}`;
    // fetching api response and returning it with parsing into js obj
    // and in another then methof receiving that object
    fetch(apiURL).then(response => response.json())
        .then(data => {
            // console.log(data);
            toText.value = data.responseData.translatedText;
            toText.setAttribute("placeholder", "Transltion ");
        });
});

// COPY AND TEXT-TO-SPEECH

icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (target.classList.contains("fa-copy")) {

            // if clicked icon has from id, copy text from FromTextArea else copy text from ToTextArea
            if (target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else if (target.id == "to") {
                navigator.clipboard.writeText(toText.value);
            }
        } else {

            // if clicked ico has from id, speak text from FromTextArea else speak text from ToTextArea
            let utterance;
            if (target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value; // setting utterance language to fromSelect tag value
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value; // setting utterance language to toSelect tag value

            }

            // if speechSynthesis is not speechSynthesis, then speak the passed utterance
            speechSynthesis.speak(utterance);
        }
    });
});