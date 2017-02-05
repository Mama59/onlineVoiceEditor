var allPossiblePhrase = [];
var allPossibleName = [];

function speechToAction(phrase) {

    var possiblePhraseMaxLenght = 0;
    if(allPossiblePhrase.length < 1)
    {
        for(var i = 0; i < dict.length; i++)
        {
            for(var j = 0; j < dict[i].phrases.length; j++)
            {
                allPossiblePhrase.push(dict[i].phrases[j]);
                if(dict[i].phrases[j].length > possiblePhraseMaxLenght)
                    possiblePhraseMaxLenght = dict[i].phrases[j].length;
            }
        }  
        possiblePhraseMaxLenght += 50;

        // Cette partie permet de mettre tout les strings de référence à égalité pour les comparaisons
        for(var i = 0; i < allPossiblePhrase.length; i++)
        {
            var tmp = allPossiblePhrase[i];
            for (var j =  allPossiblePhrase[i].length; j < possiblePhraseMaxLenght; j++) {
                tmp += "_";
            }
            allPossiblePhrase[i] = tmp;
        }
    }

    if(phrase == "")
        return;

    allPossibleName = [];
    for(var i = 0; i < agents.length; i++)
        allPossibleName.push(agents[i]._opts.name);
        
    match = findBestMatch(phrase, allPossiblePhrase);
    console.log(match);
    bestMatch = match.bestMatch;
    bestMatch.target = bestMatch.target.replace(/[_]+/g, '');
    console.log("Phrase recognized : " + phrase + "       Best match : " + bestMatch.target);

    if(bestMatch.rating < 0.1)
    {
        notifyError("No matching", "Phrase understood : " + phrase);
        return;
    }

    for(var i = 0; i < dict.length; i++)
    {
        for(var j = 0; j < dict[i].phrases.length; j++)
        {
            if(dict[i].phrases[j] == bestMatch.target)
            {
                dict[i].action(phrase);
            }
        }
    }  
}  

var dict = [
    {
        phrases: [
            "Créer un bouton",
            "Ajouter un bouton"
        ],
        action: function (phrase) {
            var myRegexp = /outon (.*)/i;
            var match = myRegexp.exec(phrase);
            var button = panel._createSpecifiedElement('Button');

            if(match != null)
            {
                button._updateOpts("name", match[1])
                button._updateOpts("value", match[1])
            }
        }
    },
    {
        phrases: [
            "Créer un label",
            "Ajouter un label"
        ],
                action: function (phrase) {
            var myRegexp = /abel (.*)/i;
            var match = myRegexp.exec(phrase);
            var label = panel._createSpecifiedElement('Label');
            
            if(match != null)
            {
                label._updateOpts("name", match[1])
                label._updateOpts("value", match[1])
            }
        }
    },
    {
        phrases: [
            "Créer une image",
            "Ajouter une image"
        ],
        action: function (phrase) {
            var myRegexp = /mage (.*)/i;
            var match = myRegexp.exec(phrase);
            var image = panel._createSpecifiedElement('Image');
            
            if(match != null)
            {
                image._updateOpts("name", match[1])
            }
        }
    },
    {
        phrases: [
            "Créer une Textarea",
            "Ajouter une Textarea"
        ],
        action: function (phrase) {
            var myRegexp = /area (.*)/i;
            var match = myRegexp.exec(phrase);
            var textArea = panel._createSpecifiedElement('TextArea');
            
            if(match != null)
            {
                textArea._updateOpts("name", match[1])
            }
        }
    },
    {
        phrases: [
            "Créer un input",
            "Ajouter un input"
        ],
        action: function (phrase) {
            var myRegexp = /input (.*)/i;
            var match = myRegexp.exec(phrase);
            var input = panel._createSpecifiedElement('Input');
            
            if(match != null)
            {
                input._updateOpts("name", match[1])
            }
        }
    },
    {
        phrases: [
            "Ajouter xx ligne",
            "Créer xx ligne"
        ],
        action: function (phrase) {
            var myRegexp = /(\d+)/i;
            var match = myRegexp.exec(phrase);
            if(match != null)
            {
                for(var i = 0; i < match[1]; i++)
                    document.getElementById('idAddLine').click();
            }
            else
                document.getElementById('idAddLine').click();
        }
    },
    {
        phrases: [
            "Déplacer xx vers xx de xx",
            "Bouger xx vers xx de xx"
        ],
        action: function (phrase) {
            var myRegexp = /(bouger|déplacer) (.*)vers .* (droite|gauche|bas|haut) de (\d+)|(bouger|déplacer) (.*)vers .* (droite|gauche|bas|haut)/i;
            var match = myRegexp.exec(phrase);
            
            if(match != null)
            {
                var posAgentName = 2;
                var posAgentDirection = 3;
                var posNbMove = 4;
                if(match[6] != null)
                {
                    posAgentName = 6;
                    posAgentDirection = 7;
                }

                if(match[posAgentName] != "")
                {
                    bestMatch = findBestMatch(match[posAgentName], allPossibleName).bestMatch;
                    var agent = document.getElementById(bestMatch.target);
                    agent.click();
                }
                
                if(match[posNbMove] != null)
                    Agent.letterBox.nbMove = match[posNbMove];
                else
                    Agent.letterBox.nbMove  = 0;

                if(match[posAgentDirection] == "gauche")
                    Agent.letterBox.direction = Agent.CODE[37];
                else if(match[posAgentDirection] == "haut")
                    Agent.letterBox.direction = Agent.CODE[38];
                else if(match[posAgentDirection] == "droite")
                    Agent.letterBox.direction = Agent.CODE[39];
                else if(match[posAgentDirection] == "bas")
                    Agent.letterBox.direction = Agent.CODE[40];
            }
            else
                notifyError("No matching", "Phrase understood : " + phrase);
        }
    }
]; 
