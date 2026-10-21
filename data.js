// Dialogues, questions orales et paires de sons. Paliers 1 à 8 (A1 → B2+).
const DATA = {
dialogs: [
{l:1,lines:["Hi, how are you?","I'm fine, thanks. And you?","I'm tired today."],tr:["Salut, comment ça va ?", "Bien, merci. Et toi ?", "Je suis fatigué aujourd'hui."],q:"Comment va la première personne ?",o:["Fatiguée","Bien","Malade","Très contente"]},
{l:1,lines:["Excuse me, where is the station?","It's on the left, near the bank."],tr:["Excusez-moi, où est la gare ?", "Elle est à gauche, près de la banque."],q:"Où est la gare ?",o:["À gauche, près de la banque","À droite, près de la banque","À gauche, près de l'hôtel","Tout droit, loin d'ici"]},
{l:2,lines:["How much is this coffee?","It's three dollars.","OK, and a croissant too, please."],tr:["Combien coûte ce café ?", "Trois dollars.", "D'accord, et un croissant aussi, s'il vous plaît."],q:"Combien coûte le café ?",o:["3 dollars","2 dollars","13 dollars","30 dollars"]},
{l:2,lines:["What time does the bus leave?","At ten fifteen.","Thank you!"],tr:["À quelle heure part le bus ?", "À dix heures quinze.", "Merci !"],q:"À quelle heure part le bus ?",o:["10 h 15","10 h 50","9 h 15","11 h 15"]},
{l:3,lines:["Did you sleep well?","Not really. My room was very noisy."],tr:["Tu as bien dormi ?", "Pas vraiment. Ma chambre était très bruyante."],q:"Pourquoi a-t-il mal dormi ?",o:["Sa chambre était bruyante","Son lit était inconfortable","Il faisait trop chaud","Il est arrivé tard"]},
{l:3,lines:["Could we have the bill, please?","Of course. Card or cash?","By card, please."],tr:["On pourrait avoir l'addition, s'il vous plaît ?", "Bien sûr. Carte ou espèces ?", "Par carte, s'il vous plaît."],q:"Comment paie le client ?",o:["Par carte","En espèces","Par chèque","Il ne paie pas"]},
{l:4,lines:["Hello, I booked a room for two nights.","What's your name, please?","Durand.","Sorry, I have a reservation for three nights."],tr:["Bonjour, j'ai réservé une chambre pour deux nuits.", "Votre nom, s'il vous plaît ?", "Durand.", "Désolé, j'ai une réservation pour trois nuits."],q:"Quel est le problème ?",o:["La réservation est pour 3 nuits au lieu de 2","Il n'y a aucune réservation","Le nom est faux","L'hôtel est complet"]},
{l:4,lines:["Our flight is delayed.","How long?","About two hours. Let's get something to eat."],tr:["Notre vol est retardé.", "De combien ?", "Environ deux heures. Allons manger quelque chose."],q:"Que vont-ils faire ?",o:["Manger quelque chose","Rentrer chez eux","Changer de vol","Dormir à l'hôtel"]},
{l:5,lines:["Can you pick me up at the airport tomorrow?","Sure. What time do you land?","Around six in the evening."],tr:["Tu peux venir me chercher à l'aéroport demain ?", "Bien sûr. Tu atterris à quelle heure ?", "Vers six heures du soir."],q:"À quelle heure atterrit-il ?",o:["Vers 18 h","Vers 6 h du matin","Vers 16 h","Vers 20 h"]},
{l:5,lines:["I'm not used to the food here.","Really? I love it, but it's a bit spicy."],tr:["Je n'ai pas l'habitude de la nourriture ici.", "Vraiment ? Moi j'adore, mais c'est un peu épicé."],q:"Que pense la deuxième personne de la nourriture ?",o:["Elle adore, mais c'est un peu épicé","Elle déteste","C'est trop cher","Elle n'a pas goûté"]},
{l:6,lines:["Shall we go to the beach or the museum?","It's up to you, I don't mind. But it might rain later.","Then let's go to the museum."],tr:["On va à la plage ou au musée ?", "C'est toi qui vois, ça m'est égal. Mais il risque de pleuvoir plus tard.", "Alors allons au musée."],q:"Où vont-ils aller ?",o:["Au musée","À la plage","Au restaurant","Ils restent à l'hôtel"]},
{l:6,lines:["How come you're still here? I thought you'd left.","I missed my train, so I'm taking the next one in an hour."],tr:["Comment ça se fait que tu sois encore là ? Je croyais que tu étais parti.", "J'ai raté mon train, alors je prends le suivant dans une heure."],q:"Pourquoi est-il encore là ?",o:["Il a raté son train","Il a oublié son sac","Son train est annulé","Il attend un ami"]}
],
questions: [
{l:1,q:"What is your name?",fr:"Comment tu t'appelles ?",ex:"My name is François."},
{l:1,q:"Where do you live?",fr:"Où habites-tu ?",ex:"I live in France, near Lille."},
{l:1,q:"Do you like coffee?",fr:"Tu aimes le café ?",ex:"Yes, I like coffee. / No, I don't like coffee."},
{l:1,q:"How old are you?",fr:"Quel âge as-tu ?",ex:"I am eighteen years old."},
{l:2,q:"What do you do?",fr:"Que fais-tu dans la vie ?",ex:"I am a student in a business school."},
{l:2,q:"What do you eat for breakfast?",fr:"Que manges-tu au petit-déjeuner ?",ex:"I usually eat bread and I drink coffee."},
{l:2,q:"Do you have brothers or sisters?",fr:"As-tu des frères et sœurs ?",ex:"Yes, I have one brother. / No, I don't."},
{l:2,q:"What's the weather like today?",fr:"Quel temps fait-il aujourd'hui ?",ex:"It's cold and it's raining."},
{l:3,q:"What did you do yesterday?",fr:"Qu'as-tu fait hier ?",ex:"I went to school and I played table tennis."},
{l:3,q:"Where did you go on holiday last year?",fr:"Où es-tu parti en vacances l'année dernière ?",ex:"I went to Spain with my family."},
{l:3,q:"What time did you wake up this morning?",fr:"À quelle heure t'es-tu réveillé ce matin ?",ex:"I woke up at seven."},
{l:4,q:"Why are you learning English?",fr:"Pourquoi apprends-tu l'anglais ?",ex:"Because I want to travel and I need it for my studies."},
{l:4,q:"Which country would you like to visit?",fr:"Quel pays aimerais-tu visiter ?",ex:"I would like to visit Canada because it looks beautiful."},
{l:4,q:"How do you go to school?",fr:"Comment vas-tu à l'école ?",ex:"I usually take the metro. It takes about twenty minutes."},
{l:5,q:"What are you looking forward to?",fr:"Qu'est-ce que tu as hâte de faire ?",ex:"I'm looking forward to my trip abroad."},
{l:5,q:"What do you do when you feel tired?",fr:"Que fais-tu quand tu te sens fatigué ?",ex:"I go to bed early and I turn off my phone."},
{l:6,q:"If you could live anywhere, where would you live?",fr:"Si tu pouvais vivre n'importe où, où vivrais-tu ?",ex:"If I could, I would live in Canada because people are friendly."},
{l:6,q:"What would you do with more free time?",fr:"Que ferais-tu avec plus de temps libre ?",ex:"I would travel more and I would read in English."}
],
pairFr: {ship:"navire",sheep:"mouton",live:"vivre",leave:"partir",full:"plein",fool:"idiot",cat:"chat",cut:"couper",bed:"lit",bad:"mauvais",walk:"marcher",work:"travailler",three:"trois",tree:"arbre",think:"penser",sink:"évier",light:"lumière",right:"droite / juste",pull:"tirer",pool:"piscine",sit:"s'asseoir",seat:"siège",hungry:"affamé",angry:"en colère",thirteen:"treize",thirty:"trente",fifteen:"quinze",fifty:"cinquante",van:"camionnette",fan:"ventilateur",hat:"chapeau",heart:"cœur"},
pairs: [["ship","sheep"],["live","leave"],["full","fool"],["cat","cut"],["bed","bad"],["walk","work"],["three","tree"],["think","sink"],["light","right"],["pull","pool"],["sit","seat"],["hungry","angry"],["thirteen","thirty"],["fifteen","fifty"],["van","fan"],["hat","heart"]]
};
