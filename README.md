# Online voice editor
Projet rélaisé par Burléon Junior & Bal Marine & Pansa José

## Présentation
Ce projet permet de créer des pages web statique responsive grâce à l'utilisation de la voix ou grâce à au clavier et à la souris et cela sans aucune connaissance de HTML et aucune ou peu de connaissance en CSS.

Vous puvez trouvez des vidéo de démonstration ici :
démonstration à la voix : https://www.youtube.com/watch?v=Go5aZ-BP1Xo
démonstration au clavier & souris : https://www.youtube.com/watch?v=i1xQ9XCtoqg

## Structure du code source
![alt tag](http://url/to/img.png)

Core : Ensemble des classes pour faire le cœur métier de notre application.
    Vue : Ensemble des classes qui nous permettent de gérer l’affichage de notre application.
        PanelVue : Classe qui gère l’affichage du panel de façon général. 
        TableVue : Classe qui gère l’affichage de la grille sur laquelle se déplacent nos agents.
    Model : Ensemble des classes qui composent notre modèle de données.
        Agent : Classe dont hérite tous nos éléments HTML qui peuvent être manipulé par l’utilisateur de l’application. 
        Environement : Classe qui représente notre environnement multi-agent. 
        SMA : Classe qui représente notre système multi-agent.
    Utils : Ensemble des classes nous donnant différentes fonctionnalités divers et réutilisables dans d’autres projets.
    SpeechRecognition : Ensemble des classes permettant de faire la reconnaissance vocale.
        Compare-String : Classe qui implémente la comparaison de string avec la méthode de Dice’s Coefficient. 
        SpeechRecognition : Classe qui permet de récupérer la voix de l’utilisateur et de la transformer en texte. 
        SpeechToAction : Classe qui permet de reconnaitre et interpréter les actions demandées vocalement.

Visualisation : Ensemble des classes représentant les élément HTML utilisable par l’utilisateur et héritant donc de la classe Agent.
    Bouton : Représente sous forme d’agent un bouton HTML. 
    Label : Représente sous forme d’agent un label HTML. 
    Image : Représente sous forme d’agent une image HTML. 
    Input : Représente sous forme d’agent un input HTML. 
    Etc… 
    Index.html : Point d’entrée de l’application ainsi que la base de l’interface graphique.

## Un cas d'utilisation 
Cas général d'utilisation de l'application avec une commande vocal.
    - Initialisation de l'environnement et du Système multi-agent
    - Création du panel
    - Démarrage d'un tick
    - L'utilisateur donne une commande vocal, celle-ci sera gérére via les classes :
        - SpeechRecognition
        - SpeechToAction
        - Modification des données de l'Agent
    - Chaque agent est mis à jour    
    - Et finalement le tick se termine et nous en recommençons un suivant