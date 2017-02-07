var allPossiblePhrase = [];
var allPossibleName = [];
var allPossibleProperties = [];
var actionFinished = false;

var selectedAgent = null;

function speechToAction(phrase) {

    if(phrase == "")
        return;

    phrase = phrase.replace(/(.* s'il te plaît)/ig, '');
    phrase = phrase.replace(" et 2 ", " et de ");
    console.log("Brut phrase : " + phrase);

    phrase = phrase.toLowerCase();

    var phrasesplited = phrase.split(" et ");
    for(var nbSplit = 0; nbSplit < phrasesplited.length; nbSplit++)
    {
        //if(selectedAgent != null)
        //{
        //    while(!selectedAgent._finishToMove)
        //        sleep(300); 
        //}

        //--------------------------------
        // Si enchainement de la commande de déplacement 
        //--------------------------------
        phrase = phrasesplited[nbSplit];
        if(phrase.indexOf(" hau") > -1 || phrase.indexOf(" ba") > -1 || phrase.indexOf(" gauc") > -1 || phrase.indexOf(" droi") > -1)
        {
            if(!(phrase.startsWith("déplacer de")  || phrase.startsWith("bouger de")))
                phrase = "déplacer de " + phrase;
            else if(!(phrase.startsWith("déplacer ") || phrase.startsWith("bouger ")))
                phrase = "déplacer " + phrase;
        }

        //--------------------------------
        // Préparation liste de phrases 
        //--------------------------------
        var possiblePhraseMaxLenght = 0;
        if(allPossiblePhrase.length < 1)
        {
            for(var i = 0; i < dict.length; i++)
            {
                for(var j = 0; j < dict[i].phrases.length; j++)
                {
                    allPossiblePhrase.push(dict[i].phrases[j].toLowerCase());
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

        //--------------------------------
        // Préparation liste de propriétés
        //--------------------------------
        var possiblePropertiesMaxLenght = 0;
        for(var i = 0; i < agents.length; i++)
        {
            var properties = Object.keys(agents[i]._opts);
            for(var j = 0; j < properties.length; j++)
            {
                allPossibleProperties.push(properties[j].toLowerCase());
                if(properties[j].length > possiblePropertiesMaxLenght)
                    possiblePropertiesMaxLenght = properties[j].length;
            }
        }  
        possiblePropertiesMaxLenght += 20;
        // Cette partie permet de mettre tout les strings de référence à égalité pour les comparaisons
        for(var i = 0; i < allPossibleProperties.length; i++)
        {
            var tmp = allPossibleProperties[i];
            for (var j =  allPossibleProperties[i].length; j < possiblePropertiesMaxLenght; j++) {
                tmp += "&";
            }
            allPossibleProperties[i] = tmp;
        }
        
        if(phrase == "")
            return;

        //--------------------------------
        // Préparation liste des names (identifiant de chaque element)
        //--------------------------------
        allPossibleName = [];
        for(var i = 0; i < agents.length; i++)
            allPossibleName.push(agents[i]._opts.name);
            
        //--------------------------------
        // Reconnaissance de l'action
        //--------------------------------
        match = findBestMatch(phrase, allPossiblePhrase);   
        bestMatch = match.bestMatch;
        bestMatch.target = bestMatch.target.replace(/[_]+/g, '');
        console.log("Phrase recognized : " + phrase + "       Best match : " + bestMatch.target);

        if(bestMatch.rating < 0.05)
        {
            notifyError("No matching", "Phrase understood : " + phrase + "(Rating : " + bestMatch.rating + " )");
            return;
        }

        //--------------------------------
        // Faire l'action correspant à la phrase matcher
        //--------------------------------
        for(var i = 0; i < dict.length; i++)
        {
            for(var j = 0; j < dict[i].phrases.length; j++)
            {
                if(dict[i].phrases[j].toLowerCase() == bestMatch.target)
                {
                    dict[i].action(phrase);
                    break;
                }
            }
        }
    }
}  

var dict = [
    {
        phrases: [
            "Créer un titre",
            "Ajouter un titre",
            "Mettre un titre"
        ],
        action: function (phrase) {
            var myRegexp = /(Cré|Met|Ajou).*itre( .*|)/i;
            var match = myRegexp.exec(phrase);
            
            if(match != null)
            {
                var button = panel._createSpecifiedElement('Titre');
                if(match[2] != "")
                {
                    button._updateOpts("name", match[2])
                    button._updateOpts("value", match[2])
                }
            }
        }
    },
    {
        phrases: [
            "Créer un paragraphe",
            "Ajouter un paragraphe",
            "Mettre un paragraphe"
        ],
        action: function (phrase) {
            var myRegexp = /(Cré|Met|Ajou).*graphe( .*|)/i;
            var match = myRegexp.exec(phrase);
            
            if(match != null)
            {
                var button = panel._createSpecifiedElement('Paragraphe');
                if(match[2] != "")
                {
                    button._updateOpts("name", match[2])
                    button._updateOpts("value", match[2])
                }
            }
        }
    },
    {
        phrases: [
            "Créer un bouton",
            "Ajouter un bouton",
            "Mettre un bouton"
        ],
        action: function (phrase) {
            var myRegexp = /(Cré|Met|Ajou).*outon( .*|)/i;
            var match = myRegexp.exec(phrase);
            
            if(match != null)
            {
                var button = panel._createSpecifiedElement('Bouton');
                if(match[2] != "")
                {
                    button._updateOpts("name", match[2])
                    button._updateOpts("value", match[2])
                }
            }
        }
    },
    {
        phrases: [
            "Créer un label",
            "Ajouter un label",
            "Mettre un label"
        ],
        action: function (phrase) {
            var myRegexp = /(Cré|Met|Ajou).*abel( .*|)/i;
            var match = myRegexp.exec(phrase);
            
            if(match != null)
            {
                var label = panel._createSpecifiedElement('Label');
                if(match[2] != "")
                {
                    label._updateOpts("name", match[2])
                    label._updateOpts("value", match[2])
                }
            }
        }
    },
    {
        phrases: [
            "Créer une image",
            "Ajouter une image",
            "Mettre une image"
        ],
        action: function (phrase) {
            var myRegexp = /(Cré|Met|Ajou).*mage( .*|)/i;
            var match = myRegexp.exec(phrase);
            
            if(match != null)
            {
                var image = panel._createSpecifiedElement('Image');
                if(match[2] != "")
                {
                    image._updateOpts("name", match[2])
                }
            }
        }
    },
    {
        phrases: [
            "Créer une Textarea",
            "Ajouter une Textarea",
            "Mettre une Textarea"
        ],
        action: function (phrase) {
            var myRegexp = /(Cré|Met|Ajou).*area( .*|)/i;
            var match = myRegexp.exec(phrase);
            
            if(match != null)
            {
                var textArea = panel._createSpecifiedElement('TextArea');
                if(match[2] != "")
                {
                    textArea._updateOpts("name", match[2])
                }
            }
        }
    },
    {
        phrases: [
            "Créer un input",
            "Ajouter un input",
            "Mettre un input"
            
        ],
        action: function (phrase) {
            var myRegexp = /(Cré|Met|Ajou).*input( .*|)/i;
            var match = myRegexp.exec(phrase);
            
            
            if(match != null)
            {
                var input = panel._createSpecifiedElement('Input');
                if(match[2] != "")
                {
                    input._updateOpts("name", match[2])
                }
            }
        }
    },
    {
        phrases: [
            "Ajouter xx ligne",
            "Créer xx ligne",
            "Mettre xx ligne"
        ],
        action: function (phrase) {
            try
            {
                var myRegexp = /(Cré|Met|Ajou).*( \d+)/i;
                var match = myRegexp.exec(phrase);
                if(match != null)
                {
                    if(match[2] != "")
                    {
                        var nbLine = convertLetterNumbersFromGoogleSpeechToInt(match[2])
                        for(var i = 0; i < nbLine; i++)
                            document.getElementById('idAddLine').click();
                    }
                }
                else
                    document.getElementById('idAddLine').click();
            }
            catch(e)
            {
                notifyError("No regex matching", "Phrase understood : " + phrase);
            }
        }
    },
    {
        phrases: [
            "Sélectionner xx"
        ],
        action: function (phrase) {
            try
            {
                var myRegexp = /Sélectionn.. (.*)/i;
                var match = myRegexp.exec(phrase);
                
                if(match != null)
                {
                    if(match[1] != "")
                    {
                        bestMatch = findBestMatch(match[1], allPossibleName).bestMatch;
                        var element = document.getElementById(bestMatch.target);
                        element.click();
                    }
                }
            }
            catch(e)
            {
                notifyError("No regex matching", "Phrase understood : " + phrase);
                actionFinished = true;
            }
        }
    },
    {
        phrases: [
            "Supprimer xx",
            "Retirer xx",
            "Enlever xx",
        ],
        action: function (phrase) {
            try
            {
                var myRegexp = /(Supp|Reti|Enl)[^\s]+(.*)/i;
                var match = myRegexp.exec(phrase);
                
                if(match != null)
                {
                    var agent = Agent.selected;
                    if(match[2] != "")
                    {
                        bestMatch = findBestMatch(match[2], allPossibleName).bestMatch;
                        var element = document.getElementById(bestMatch.target);
                        element.click();
                        agent = element.agent;
                    }

                    //sma.killAgent(agent);
                    agent.die();
                }
            }
            catch(e)
            {
                notifyError("No regex matching", "Phrase understood : " + phrase);
                actionFinished = true;
            }
        }
    },
    {
        phrases: [
            "Modifier la propriété xx de xx avec xx",
            "Changer la propriété xx de xx avec xx",
            "Modifier la propriété xx de xx en xx",
            "Changer la propriété xx de xx en xx",
            "Modifier la propriété xx de xx par xx",
            "Changer la propriété xx de xx par xx",
            "Modifier xx de xx avec xx",
            "Changer xx de xx avec xx",
            "Modifier xx de xx en xx",
            "Changer xx de xx en xx",
            "Modifier xx de xx par xx",
            "Changer xx de xx par xx"
        ],
        action: function (phrase) {
            try
            {
                /*
                Modifier la propriété name de toto avec azerty - 5 7 9
                Changer la propriété name de toto avec azerty - 5 7 9
                Modifier name de toto avec azerty - 5 7 9
                Changer name de toto avec azerty - 5 7 9
                Modifier name avec azerty - 14 16
                Changer name avec azerty - 14 16
                */

                var myRegexp = /(modi[^\s]+|chang[^\s]+) (.* propriété |)((le|la) |)(.*)( de )(.*)( avec | par | part | en | à | a )(.*)|(modi[^\s]+|chang[^\s]+) (.* propriété |)((le|la) |)(.*)( avec | par | part | en | à | a )(.*)/i;
                var match = myRegexp.exec(phrase);
                
                var property = "";
                var elementName = "";
                var newValue = "";

                if(match[5] != null)
                {
                    property = match[5];
                    elementName = match[7];
                    newValue = match[9];
                }
                else if(match[14] != null)
                {
                    property = match[14];
                    newValue = match[16];
                }

                if(elementName == "")
                    elementName = Agent.selected._opts.name;

                bestMatch = findBestMatch(elementName, allPossibleName).bestMatch;
                var element = document.getElementById(bestMatch.target);
                element.click();

                if(property != "")
                {
                    bestMatch = findBestMatch(property, allPossibleProperties).bestMatch;
                    property = bestMatch.target.replace(/[&]+/g, '');

                    if(agentContainProperty(Agent.selected, property))
                    {
                        if (newValue == "rien") {
                            Agent.selected._updateOpts(property, "");
                        }
                        else {
                            Agent.selected._updateOpts(property, convertLetterNumbersFromGoogleSpeechToInt(newValue));
                        }
                    }
                    else
                    {
                        notifyError("Property unreconized for this element", "Phrase understood : " + phrase);
                    }
                }
            }
            catch(e)
            {
                notifyError("No regex matching", "Phrase understood : " + phrase);
            }            
        }
    },
    {
        phrases: [
            "Déplacer xx vers xx de xx",
            "Bouger xx vers xx de xx",
            "Déplacer xx de xx vers xx",
            "Bouger xx de xx vers xx",
            "Déplacer xx à xx de xx",
            "Bouger xx à xx de xx",
            "Déplacer xx de xx à xx",
            "Bouger xx de xx à xx",
            "Déplacer xx de xx sur xx",
            "Bouger xx de xx sur xx"
        ],
        action: function (phrase) {
            try
            {
                /*
                    Pour test la regex dans tout les cas possible ( le - x y z, sont les numéros de groupe qui doivent match ):

                    déplacer toto de 3 à droite - 2 3 7
                    bouger toto de 3 à droite - 2 3 7
                    déplacer de 3 à droite  - 2 3 7
                    bouger de 3 à droite  - 2 3 7
                    ---
                    déplacer toto de 3 vers la droite - 2 3 7
                    bouger toto de 3 vers la droite - 2 3 7
                    déplacer de 3 vers la droite  - 2 3 7
                    bouger de 3 vers la droite  - 2 3 7
                    ------------------------------------
                    déplacer toto à droite de 3 - 9 11 12
                    bouger toto à droite de 3  - 9 11 12
                    déplacer à droite de 3 - 9 11 12
                    bouger à droite de 3 - 9 11 12
                    ---
                    déplacer toto vers la droite de 3 - 9 11 12
                    bouger toto vers la droite de 3  - 9 11 12
                    déplacer vers la droite de 3 - 9 11 12
                    bouger vers la droite de 3 - 9 11 12
                    ------------------------------------
                    déplacer toto à droite - 14 16
                    bouger toto à droite - 14 16
                    déplacer à droite - 14 16
                    bouger à droite - 14 16
                    ---
                    déplacer toto vers la droite - 14 16
                    bouger toto vers la droite - 14 16
                    déplacer vers la droite - 14 16
                    bouger vers la droite - 14 16
                */

                // Dans cette regex chaque fois que l'on trouve [^\s] c'est parce que ainsi on est moins senseible a une mauvaise compréhenssion de google speech
                var myRegexp = /(bou[^\s]+|dépla[^\s]+) (.*)de (.*) (à|vers (le|la)|sur (le|la)) (droi[^\s]+|gau[^\s]+|ba[^\s]+|hau[^\s]+)|(bou[^\s]+|dépla[^\s]+) (.*)(à|vers .*|sur .*) (droi[^\s]+|gau[^\s]+|ba[^\s]+|hau[^\s]+) de (.*)|(bou[^\s]+|dépla[^\s]+) (.*)(à|vers .*|sur .*) (droi[^\s]+|gau[^\s]+|ba[^\s]+|hau[^\s]+)/i;
                // regex qui pourrait améliorer la précédente en partie mais pas du tout finie, donc juste une base si on veut évoluer dessus : (bou[^\s]+|dépla[^\s]+) ([^\s]+) (à |(vers .* |vers |.* )|)(droi[^\s]+|gau[^\s]+|ba[^\s]+|hau[^\s]+) (de |)(\d+|)
                var match = myRegexp.exec(phrase);
                
                if(match != null)
                {
                    var posAgentName = 0;
                    var posAgentDirection = 0;
                    var posNbMove = 0;
                    /*
                    déplacer toto de 3 à droite - 2 3 7
                    bouger toto de 3 à droite - 2 3 7
                    déplacer de 3 à droite  - 2 3 7
                    bouger de 3 à droite  - 2 3 7
                    ---
                    déplacer toto de 3 vers la droite - 2 3 7
                    bouger toto de 3 vers la droite - 2 3 7
                    déplacer de 3 vers la droite  - 2 3 7
                    bouger de 3 vers la droite  - 2 3 7
                    */
                    if(match[2] != null)
                    {
                        posAgentName = 2;
                        posAgentDirection = 7;
                        posNbMove = 3;
                    }
                    /*
                    déplacer toto à droite de 3 - 9 11 12
                    bouger toto à droite de 3  - 9 11 12
                    déplacer à droite de 3 - 9 11 12
                    bouger à droite de 3 - 9 11 12
                    ---
                    déplacer toto vers la droite de 3 - 9 11 12
                    bouger toto vers la droite de 3  - 9 11 12
                    déplacer vers la droite de 3 - 9 11 12
                    bouger vers la droite de 3 - 9 11 12
                    */
                    else if(match[9] != null)
                    {
                        posAgentName = 9;
                        posAgentDirection = 11;
                        posNbMove = 12;
                    }
                    /*
                    déplacer toto à droite - 14 16
                    bouger toto à droite - 14 16
                    déplacer à droite - 14 16
                    bouger à droite - 14 16
                    ---
                    déplacer toto vers la droite - 14 16
                    bouger toto vers la droite - 14 16
                    déplacer vers la droite - 14 16
                    bouger vers la droite - 14 16
                    */
                    if(match[14] != null)
                    {
                        posAgentName = 14;
                        posAgentDirection = 16;
                        posNbMove = 1;
                    }

                    if(match[posAgentName] != "")
                    {
                        bestMatch = findBestMatch(match[posAgentName], allPossibleName).bestMatch;
                        var element = document.getElementById(bestMatch.target);
                        element.click();
                    }
                    
                    if(match[posNbMove] != null)
                    {
                        var nbMove = convertLetterNumbersFromGoogleSpeechToInt(match[posNbMove]);
                        Agent.letterBox.nbMove = nbMove;
                    } 
                    else
                        Agent.letterBox.nbMove  = 0;

                    // On utlise StartWith du à la spécificité de la regex qui essaye d'être moins sensible a une mauvaise compréhenssion de google speech
                    if(match[posAgentDirection].startsWith("gau"))
                        Agent.letterBox.direction = Agent.CODE[37];
                    else if(match[posAgentDirection].startsWith("hau"))
                        Agent.letterBox.direction = Agent.CODE[38];
                    else if(match[posAgentDirection].startsWith("droi"))
                        Agent.letterBox.direction = Agent.CODE[39];
                    else if(match[posAgentDirection].startsWith("ba"))
                        Agent.letterBox.direction = Agent.CODE[40];
                }
                else
                    notifyError("No regex matching", "Phrase understood : " + phrase);
            }
            catch(e)
            {
                notifyError("No regex matching", "Phrase understood : " + phrase);
            }
            finally
            {
                //selectedAgent = Agent.selected;
                //selectedAgent._finishToMove = false;
            }
        }
    },
    {
        phrases: [
            "Monter xx de xx",
            "Descendre xx de xx"
        ],
        action: function (phrase) {
            try
            {
                /*
                Monter toto de 3 - 1 2 4
                Descendre toto de 3 - 1 2 4
                */
                var myRegexp = /(m[^\s]+|d[^\s]+) (.*)(de |d')(.*)/i;
                var match = myRegexp.exec(phrase);
                
                if(match != null)
                {
                    if(match[2] != "")
                    {
                        bestMatch = findBestMatch(match[2], allPossibleName).bestMatch;
                        var element = document.getElementById(bestMatch.target);
                        element.click();
                    }

                    if(match[4] != null)
                    {
                        var nbMove = convertLetterNumbersFromGoogleSpeechToInt(match[4]);
                        Agent.letterBox.nbMove = nbMove;
                    } 
                    else
                        Agent.letterBox.nbMove  = 0;

                    // On utlise StartWith du à la spécificité de la regex qui essaye d'être moins sensible a une mauvaise compréhenssion de google speech
                    if(match[1].startsWith("m"))
                        Agent.letterBox.direction = Agent.CODE[38];
                    else if(match[1].startsWith("d"))
                        Agent.letterBox.direction = Agent.CODE[40];
                }
                else
                    notifyError("No regex matching", "Phrase understood : " + phrase);
            }
            catch(e)
            {
                notifyError("No regex matching", "Phrase understood : " + phrase);
            }
            finally
            {
                //selectedAgent = Agent.selected;
                //selectedAgent._finishToMove = false;
            }
        }
    }
]; 


function convertLetterNumbersFromGoogleSpeechToInt(str)
{
    switch(str)
    {
        case "zéro" : 
            str = 0; break;
        case "un" : 
        case "une" : 
        case "seins" :
        case "hein":
            str = 1; break; // Du à google speech
        case "deux" : 
        case "de" :
            str = 2; break;
        case "trois" :
        case "troyes" : 
            str = 3; break; // Du à google speech
        case "quatre" : 
            str = 4; break;
        case "cinq" : 
            str = 5; break;
        case "six" : 
            str = 6; break;
        case "sept" : 
        case "cet" : 
        case "cette" : 
            str = 7; break;
        case "huit" : 
            str = 8; break;
        case "neuf" : 
            str = 9; break;
        case "dix" : 
            str = 10; break;
        // Après 10 en général ils sont compris et écrit en chiffre directement par Google Speech
    }

    return str;
}


function agentContainProperty(agent, property)
{
    var properties = Object.keys(agent._opts);
    for(var j = 0; j < properties.length; j++)
    {
        allPossibleProperties.push(properties[j].toLowerCase());
        if(properties[j] == property)
            return true;
    }
    return false;
}