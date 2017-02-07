var final_transcript = '';
var recognizing = false;
var previous_final_transcript ='';
var continueRecognizing = false;
var interimPhrase = "";

if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  //start_button.style.display = 'inline-block';
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() {
    recognizing = true;
    start_img.src = '../ressources/mic-animate.gif';
  };

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      start_img.src = '../ressources/mic.gif';
      notifyError('No speech was detected. You may need to adjust your <a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892"> microphone settings</a>.');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      start_img.src = '../ressources/mic.gif';
      notifyError('No microphone was found. Ensure that a microphone is installed and that <a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892"> microphone settings</a> are configured correctly.');
      ignore_onend = true;
    }
  };

  recognition.onend = function() {
    if(continueRecognizing)
      recognizing = false;
    else
      recognizing = true;

      speechToAction(final_transcript);
      previous_final_transcript = final_transcript;
      final_transcript = "";
      startButton(event);
      start_img.src = '../ressources/mic.gif';
      continueRecognizing = false;
  };

  recognition.onresult = function(event) {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript = event.results[i][0].transcript;
        continueRecognizing = true;
        interimPhrase = '';
        document.getElementById("interimPhraseId").innerHTML = interimPhrase;
        recognition.stop();
      }
      else
      {
        interimPhrase = event.results[i][0].transcript;
        interimPhrase = interimPhrase.replace(/(.* s'il te plaît)/ig, '');
        document.getElementById("interimPhraseId").innerHTML = interimPhrase;
      }
    }
  };
}

function startButton(event) {
  if (recognizing) {
    recognition.stop();
    recognizing = false;
    return;
  }

  interimPhrase = '';
  final_transcript = '';
  recognition.lang = 'fr-FR';
  recognition.start();
  start_img.src = '../ressources/mic-slash.gif';
}

document.onkeypress = function(e) {
    var code = e.keyCode ? e.keyCode : e.which;
    //console.log(code);
    if(code === 13)
    {
      continueRecognizing = true;
      recognition.stop();
    }

    if(code === 178)
    {
      continueRecognizing = false;
      recognition.stop();
    }

    if(code === 38)
    {
      continueRecognizing = false;
      startButton();
    }
};

function upgrade() {
  notifyError('Web Speech API is not supported by this browser. Upgrade to <a href="//www.google.com/chrome">Chrome</a> version 25 or later.');
}