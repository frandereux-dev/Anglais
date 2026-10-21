// Vocabulaire du quotidien. Niveau CECR de chaque mot repris de l'Oxford 3000/5000 (Oxford University Press),
// sauf les verbes à particule et quelques mots absents de la liste (niveau choisi selon l'usage courant).
// Dans chaque niveau : première moitié = palier bas, seconde moitié = palier « + ».
const WORDLIST = {
A1: `hello|bonjour
yes|oui
no|non
please|s'il te plaît
thank you/thanks|merci
sorry|désolé
goodbye/bye|au revoir
water|eau
food|nourriture
bread|pain
coffee|café
tea|thé
milk|lait
egg|œuf
meat|viande
fish|poisson
chicken|poulet
rice|riz
cheese|fromage
apple|pomme
fruit|fruit
vegetable|légume
potato|pomme de terre
breakfast|petit-déjeuner
lunch|déjeuner
dinner|dîner
house|maison
home|chez soi
room|pièce
kitchen|cuisine
bedroom|chambre
bathroom|salle de bain
door|porte
window|fenêtre
table|table
chair|chaise
bed|lit
family|famille
mother|mère
father|père
brother|frère
sister|sœur
parent|parent
child|enfant
friend|ami
man|homme
woman|femme
boy|garçon
girl|fille
baby|bébé
name|nom
day|jour
night|nuit
morning|matin
afternoon|après-midi
evening|soir
week|semaine
weekend|week-end
month|mois
year|année
today|aujourd'hui
tomorrow|demain
yesterday|hier
tonight|ce soir
now|maintenant
time|temps / heure
hour|heure
minute|minute
to be|être
to have|avoir
to go|aller
to come|venir
to do|faire
to make|fabriquer / faire
to eat|manger
to drink|boire
to sleep|dormir
to work|travailler
to live|habiter / vivre
to like|aimer bien
to love|adorer / aimer
to want|vouloir
to need|avoir besoin de
to know|savoir / connaître
to think|penser
to see|voir
to look|regarder
to watch|regarder (un film)
to listen|écouter
to hear|entendre
to speak|parler
to talk|discuter
to say|dire
to tell|raconter / dire à
to ask|demander
to answer|répondre
to understand|comprendre
to read|lire
to write|écrire
to buy|acheter
to pay|payer
to give|donner
to take|prendre
to get|obtenir / recevoir
to help|aider
to wait|attendre
to find|trouver
to open|ouvrir
to close|fermer
to start|commencer
to finish|finir
to stop|arrêter
to walk|marcher
to run|courir
to drive|conduire
to arrive|arriver
to leave|partir / quitter
to stay|rester
to sit|s'asseoir
to stand|être debout
to wake up|se réveiller
to wash|laver
to cook|cuisiner
to play|jouer
to learn|apprendre
to study|étudier
to travel|voyager
to visit|visiter / rendre visite
to call|appeler
to send|envoyer
to try|essayer
to use|utiliser
to forget|oublier
to remember|se souvenir
to meet|rencontrer / retrouver
to feel|se sentir / ressentir
good|bon
bad|mauvais
big|grand / gros
small|petit
little|petit / un peu
long|long
short|court
new|nouveau
old|vieux / ancien
young|jeune
hot|chaud
cold|froid
warm|tiède / chaud
happy|heureux
sad|triste
tired|fatigué
hungry|affamé
thirsty|assoiffé
angry|en colère
busy|occupé
easy|facile
difficult|difficile
expensive|cher
cheap|pas cher
beautiful|beau
nice|sympa / agréable
interesting|intéressant
boring|ennuyeux
important|important
different|différent
same|même
right|correct / droite
wrong|faux
left|gauche
near|près
far|loin
here|ici
there|là / là-bas
early|tôt
late|tard / en retard
fast|rapide
slow|lent
quick|rapide
ready|prêt
free|libre / gratuit
open|ouvert
full|plein
always|toujours
often|souvent
sometimes|parfois
never|jamais
usually|d'habitude
again|encore / à nouveau
also|aussi
very|très
really|vraiment
too|trop / aussi
maybe|peut-être
because|parce que
but|mais
or|ou
if|si
when|quand
where|où
why|pourquoi
how|comment
what|quoi / qu'est-ce que
who|qui
money|argent
price|prix
shop|magasin
supermarket|supermarché
market|marché
restaurant|restaurant
cafe|café (lieu)
menu|carte / menu
bill|addition / facture
waiter|serveur
hotel|hôtel
ticket|billet
station|gare / station
airport|aéroport
plane|avion
train|train
bus|bus
car|voiture
bike|vélo
taxi|taxi
street|rue
road|route
city|ville
town|petite ville
village|village
country|pays
map|carte / plan
passport|passeport
bag|sac
holiday/vacation|vacances
trip|voyage / excursion
flight|vol
beach|plage
sea|mer
mountain|montagne
river|rivière / fleuve
park|parc
weather|météo / temps
sun|soleil
rain|pluie
snow|neige
summer|été
winter|hiver
spring|printemps
autumn/fall|automne
school|école
university|université
student|étudiant
teacher|professeur
class|cours / classe
lesson|leçon
exam|examen
homework|devoirs
job|emploi / boulot
office|bureau
company|entreprise
meeting|réunion
phone|téléphone
computer|ordinateur
email|e-mail
message|message
music|musique
song|chanson
film/movie|film
book|livre
game|jeu / match
sport|sport
football/soccer|football
clothes|vêtements
shirt|chemise
shoe|chaussure
coat|manteau
jacket|veste
body|corps
head|tête
hand|main
eye|œil
doctor|médecin
hospital|hôpital
problem|problème
question|question
idea|idée
thing|chose
place|endroit
people|gens
person|personne
world|monde
life|vie
birthday|anniversaire
party|fête
probably|probablement
together|ensemble
to book|réserver
to miss|rater / manquer
to lose|perdre
to choose|choisir
to decide|décider
to agree|être d'accord
to explain|expliquer
to bring|apporter
to carry|porter
to keep|garder
to spend|dépenser / passer (du temps)
to share|partager
to hope|espérer
to enjoy|apprécier
to prefer|préférer
to break|casser
to fall|tomber
to win|gagner
to improve|améliorer
to change|changer
to move|bouger / déménager
to return|revenir / rendre
to happen|arriver / se passer
to laugh|rire
quiet|calme
dangerous|dangereux
amazing|incroyable
bored|qui s'ennuie
local|local
married|marié
sick|malade
customer|client
neighbour/neighbor|voisin
journey|trajet
traffic|circulation
change|monnaie
mistake|erreur
health|santé
glass|verre
bottle|bouteille
key|clé
umbrella|parapluie
news|nouvelles / infos
to compare|comparer
interview|entretien
career|carrière
opinion|avis
skill|compétence
situation|situation
routine|routine`,
A2: `abroad|à l'étranger
already|déjà
almost|presque
actually|en fait
anyway|de toute façon
although|bien que
instead|à la place
especially|surtout
finally|finalement / enfin
suddenly|soudain
recently|récemment
certainly|certainement
definitely|sans aucun doute
nearly|presque
exactly|exactement
immediately|immédiatement
unfortunately|malheureusement
alone|seul
yet|encore / déjà (question)
since|depuis
while|pendant que
either|l'un ou l'autre / non plus
to borrow|emprunter
to lend|prêter
to disagree|ne pas être d'accord
to save|économiser / sauver
to earn|gagner (de l'argent)
to worry|s'inquiéter
to complain|se plaindre
to suggest|proposer
to recommend|recommander
to realize|se rendre compte
to recognize|reconnaître
to notice|remarquer
to expect|s'attendre à
to allow|permettre
to avoid|éviter
to accept|accepter
to refuse|refuser
to invite|inviter
to celebrate|fêter
to arrange|organiser
to organize|organiser
to manage|gérer / réussir à
to fix|réparer
to repair|réparer
to drop|faire tomber
to hurt|faire mal / blesser
to catch|attraper
to throw|lancer
to pull|tirer
to push|pousser
to hold|tenir
to hide|cacher
to steal|voler (dérober)
to fail|échouer
to succeed|réussir
to increase|augmenter
to reduce|réduire
to continue|continuer
to reach|atteindre
to reply|répondre
to promise|promettre
to belong|appartenir
to depend|dépendre
to seem|sembler
to discover|découvrir
to download|télécharger
to print|imprimer
to search|chercher
to smell|sentir (odeur)
to taste|goûter
to smile|sourire
to cry|pleurer
to shout|crier
to marry|épouser
available|disponible
comfortable|confortable
crowded|bondé
noisy|bruyant
careful|prudent
safe|en sécurité
lucky|chanceux
lovely|charmant
awful|affreux
brilliant|génial
excellent|excellent
strange|bizarre
normal|normal
ordinary|ordinaire
serious|sérieux
polite|poli
rude|impoli
lazy|paresseux
clever|intelligent / malin
stupid|bête
nervous|nerveux / stressé
worried|inquiet
scared|effrayé
surprised|surpris
pleased|content
broken|cassé
empty|vide
heavy|lourd
fresh|frais
dry|sec
wet|mouillé
soft|doux / mou
loud|fort (son)
huge|énorme
whole|entier
foreign|étranger
public|public
single|seul / célibataire
ill|malade
accident|accident
boss|patron
colleague|collègue
guest|invité
couple|couple
kid|gamin
guy|mec / type
luggage|bagages
platform|quai
seat|siège / place
direction|direction
distance|distance
corner|coin
bridge|pont
parking|stationnement
petrol/gas|essence
cash|espèces
salary|salaire
sale|solde / vente
gift|cadeau
choice|choix
chance|chance / occasion
decision|décision
experience|expérience
habit|habitude
noise|bruit
pain|douleur
headache|mal de tête
medicine|médicament
injury|blessure
fridge|frigo
oven|four
knife|couteau
fork|fourchette
spoon|cuillère
plate|assiette
recipe|recette
furniture|meubles
wallet|portefeuille
mirror|miroir
towel|serviette
soap|savon
weight|poids
size|taille
fashion|mode
sock|chaussette
belt|ceinture
skin|peau
heart|cœur
brain|cerveau
voice|voix
memory|souvenir / mémoire
dream|rêve
fear|peur
luck|chance
joke|blague
secret|secret
wedding|mariage
forest|forêt
lake|lac
coast|côte
sky|ciel
cloud|nuage
storm|tempête
temperature|température
environment|environnement
pollution|pollution
daily|quotidien
everyday|de tous les jours
wind|vent
goal|objectif
behaviour/behavior|comportement
personality|personnalité
relationship|relation
advantage|avantage
solution|solution
tradition|tradition
knowledge|connaissances
thief|voleur
deal|affaire / marché
opportunity|opportunité
argument|dispute / argument
schedule|emploi du temps
alive|vivant
asleep|endormi
bowl|bol
bin|poubelle
biscuit/cookie|biscuit
to boil|faire bouillir
to burn|brûler
button|bouton
castle|château
to chat|discuter
chef|chef cuisinier
clearly|clairement
coach|entraîneur / car
comedy|comédie
to connect|connecter
cooker|cuisinière
to count|compter
crazy|fou
to cross|traverser
crowd|foule
cupboard|placard
cycle|vélo / cycle
danger|danger
dead|mort
deep|profond
dentist|dentiste
to destroy|détruire
diary|journal intime / agenda
to disappear|disparaître
disaster|catastrophe
easily|facilement
employee|employé
employer|employeur
engine|moteur
enormous|énorme
to enter|entrer
everywhere|partout
except|sauf
factory|usine
fair|juste / équitable
fan|fan / ventilateur
to feed|nourrir
finger|doigt
fit|en forme
flu|grippe
fortunately|heureusement
gate|portail / porte
to greet|saluer
ground|sol
guide|guide
heat|chaleur
helpful|serviable / utile
hill|colline
hole|trou
human|humain
jam|confiture
to jump|sauter
knee|genou
to knock|frapper
lamp|lampe
laptop|ordinateur portable
lift/elevator|ascenseur
to lock|fermer à clé
lost|perdu
loudly|fort
mobile|portable
nature|nature
neck|cou
necessary|nécessaire
nowhere|nulle part
ocean|océan
to offer|offrir / proposer
owner|propriétaire
to pack|faire ses bagages
passenger|passager
pet|animal de compagnie
pocket|poche
quietly|doucement
railway|chemin de fer
rubbish/trash|déchets
to ring|sonner
roof|toit
round|rond / tour
sadly|malheureusement
to shake|secouer
shoulder|épaule
to shut|fermer
sign|panneau / signe
slowly|lentement
smartphone|smartphone
somewhere|quelque part
square|place / carré
stair|marche (escalier)
stomach|ventre / estomac
straight|droit / tout droit
sweet|sucré / mignon
thick|épais
thin|mince / fin
tidy|rangé
tip|pourboire / astuce
toy|jouet
underground/subway|métro
unusual|inhabituel
used to|avoir l'habitude (passé)
view|vue
to wish|souhaiter
wooden|en bois
worse|pire
worst|le pire`,
B1: `to afford|avoir les moyens de
to apologize|s'excuser
to admit|admettre
to annoy|agacer
to appreciate|apprécier
to bother|déranger
to breathe|respirer
to confirm|confirmer
to confuse|embrouiller
to convince|convaincre
to persuade|persuader
to deliver|livrer
to encourage|encourager
to escape|s'échapper
to exchange|échanger
to explore|explorer
to freeze|geler
to frighten|faire peur
to hang|accrocher / pendre
to hire|embaucher / louer
to hurry|se dépêcher
to ignore|ignorer
to injure|blesser
to intend|avoir l'intention de
to invest|investir
to judge|juger
to kick|donner un coup de pied
to kiss|embrasser
to measure|mesurer
to mix|mélanger
to pour|verser
to pretend|faire semblant
to prove|prouver
to punish|punir
to quit|arrêter / démissionner
to queue|faire la queue
to reject|rejeter
to remind|rappeler (à quelqu'un)
to rent out|mettre en location
to retire|prendre sa retraite
to revise|réviser
to suffer|souffrir
to survive|survivre
to switch|changer / basculer
to translate|traduire
to treat|traiter / soigner
to warn|prévenir / avertir
to waste|gaspiller
to wonder|se demander
to update|mettre à jour
to attach|joindre / attacher
to fasten|attacher
to fry|faire frire
to bake|faire cuire au four
to bite|mordre
to bend|plier / se pencher
to shine|briller
to vote|voter
to volunteer|faire du bénévolat
to concentrate|se concentrer
to consume|consommer
to donate|faire un don
to decorate|décorer
absolutely|absolument
approximately|environ
eventually|finalement / à la longue
fairly|assez
frequently|fréquemment
generally|en général
hardly|à peine
highly|très / hautement
mainly|principalement
meanwhile|pendant ce temps
naturally|naturellement
obviously|évidemment
originally|à l'origine
particularly|particulièrement
personally|personnellement
possibly|peut-être / éventuellement
properly|correctement
rarely|rarement
regularly|régulièrement
seriously|sérieusement
simply|simplement
slightly|légèrement
totally|totalement
despite|malgré
though|pourtant / bien que
therefore|donc
unless|à moins que
whether|si (oui ou non)
whatever|quoi que / n'importe quoi
whenever|chaque fois que
accommodation|logement / hébergement
arrival|arrivée
departure|départ
destination|destination
reservation|réservation
discount|réduction
currency|monnaie (devise)
payment|paiement
queue|file d'attente
emergency|urgence
alarm|alarme / réveil
battery|batterie
charger|chargeur
keyboard|clavier
software|logiciel
account|compte
application|candidature / appli
qualification|diplôme / qualification
profession|métier
staff|personnel
client|client
effort|effort
challenge|défi
ambition|ambition
attitude|attitude
emotion|émotion
mood|humeur
friendship|amitié
childhood|enfance
generation|génération
neighbourhood/neighborhood|quartier
countryside|campagne
atmosphere|ambiance
entertainment|divertissement
leisure|loisirs
fitness|forme physique
symptom|symptôme
treatment|traitement
muscle|muscle
throat|gorge
chest|poitrine
tongue|langue (organe)
ingredient|ingrédient
flour|farine
slice|tranche
mess|désordre
dust|poussière
shelf|étagère
ceiling|plafond
curtain|rideau
garage|garage
fence|clôture
path|chemin
border|frontière
flood|inondation
earthquake|tremblement de terre
risk|risque
safety|sécurité
security|sécurité / sûreté
warning|avertissement
damage|dégâts
loss|perte
lack|manque
disadvantage|inconvénient
consequence|conséquence
truth|vérité
doubt|doute
belief|croyance
custom|coutume
announcement|annonce
complaint|réclamation / plainte
pleasure|plaisir
happiness|bonheur
passion|passion
talent|talent
stranger|inconnu
victim|victime
convenient|pratique
confident|sûr de soi
disappointed|déçu
embarrassed|gêné
annoyed|agacé
amazed|stupéfait
frightened|effrayé
grateful|reconnaissant
proud|fier
shy|timide
lonely|seul (isolé)
upset|contrarié
relaxed|détendu
calm|calme
brave|courageux
generous|généreux
honest|honnête
cheerful|joyeux
sensible|raisonnable
silly|idiot / ridicule
careless|négligent
reliable|fiable
responsible|responsable
familiar|familier
obvious|évident
odd|bizarre
rare|rare
tiny|minuscule
giant|géant
sharp|pointu / aiguisé
tight|serré
rough|rugueux / difficile
smooth|lisse
spicy|épicé
frozen|congelé
pleasant|agréable
unpleasant|désagréable
horrible|horrible
fascinating|fascinant
impressive|impressionnant
valuable|précieux
worth|qui vaut
essential|essentiel
suitable|adapté
practical|pratique (utile)
previous|précédent
current|actuel
latest|dernier (le plus récent)
fashionable|à la mode
old-fashioned|démodé
illegal|illégal
unfair|injuste
to rent|louer
private|privé
appointment|rendez-vous
receipt|reçu
to claim|affirmer / réclamer
to commit|s'engager / commettre
to give up|abandonner
to find out|découvrir
to get on|monter (dans)
to get off|descendre (de)
to pick up|aller chercher / ramasser
to turn on|allumer
to turn off|éteindre
to look after|s'occuper de
to look forward to|avoir hâte de
issue|problème / question`,
B2: `to acknowledge|reconnaître (admettre)
to adapt|s'adapter
to approve|approuver
to assume|supposer
to attempt|tenter
to beg|supplier
to blame|reprocher / accuser
to calculate|calculer
to collapse|s'effondrer
to contribute|contribuer
to criticize|critiquer
to cure|guérir
to deal with|gérer / s'occuper de
to declare|déclarer
to defend|défendre
to delay|retarder
to deny|nier
to deserve|mériter
to dig|creuser
to dismiss|écarter / renvoyer
to distract|distraire
to emphasize|souligner
to ensure|s'assurer que
to establish|établir
to estimate|estimer
to evaluate|évaluer
to expose|exposer
to extend|prolonger
to forgive|pardonner
to gain|gagner / acquérir
to grab|attraper / saisir
to handle|gérer / manier
to hesitate|hésiter
to imply|sous-entendre
to impress|impressionner
to insist|insister
to inspire|inspirer
to interrupt|interrompre
to justify|justifier
to launch|lancer
to maintain|maintenir / entretenir
to monitor|surveiller
to negotiate|négocier
to obey|obéir
to obtain|obtenir
to offend|vexer
to owe|devoir (de l'argent)
to praise|féliciter / louer
to preserve|préserver
to pursue|poursuivre
to recall|se rappeler
to recover|se remettre / récupérer
to regret|regretter
to rely on|compter sur
to rescue|secourir
to resist|résister
to reveal|révéler
to rush|se précipiter
to satisfy|satisfaire
to scream|hurler
to seek|chercher
to settle|s'installer / régler
to stare|fixer du regard
to struggle|avoir du mal / lutter
to suspect|soupçonner
to swear|jurer
to threaten|menacer
to tear|déchirer
to urge|exhorter / pousser à
to whisper|chuchoter
to wrap|emballer
to run out of|ne plus avoir de
to get along with|bien s'entendre avec
to put off|repousser
to carry on|continuer
to set up|mettre en place
to come up with|trouver (une idée)
to figure out|comprendre / trouver
to break down|tomber en panne
to show up|se pointer
to be used to|avoir l'habitude de
apparently|apparemment
basically|en gros
constantly|constamment
deeply|profondément
deliberately|exprès
entirely|entièrement
gradually|progressivement
increasingly|de plus en plus
initially|au départ
largely|en grande partie
nevertheless|néanmoins
occasionally|de temps en temps
otherwise|sinon
rapidly|rapidement
relatively|relativement
somewhat|quelque peu
truly|vraiment
ultimately|au final
furthermore|de plus
whereas|alors que
afterwards|ensuite
elsewhere|ailleurs
wherever|partout où
anxious|anxieux
ashamed|honteux
delighted|ravi
depressed|déprimé
desperate|désespéré
impatient|impatient
satisfied|satisfait
shocked|choqué
willing|prêt à / disposé
sincere|sincère
aggressive|agressif
enthusiastic|enthousiaste
humorous|drôle
lively|animé / vivant
sensitive|sensible
tough|dur / coriace
bitter|amer
decent|correct / convenable
elderly|âgé
accurate|précis
appropriate|approprié
complicated|compliqué
confusing|déroutant
efficient|efficace
flexible|flexible
harmful|nocif
realistic|réaliste
reasonable|raisonnable
relevant|pertinent
severe|grave / sévère
significant|important / significatif
temporary|temporaire
permanent|permanent
unexpected|inattendu
unique|unique
vital|vital
crucial|crucial
massive|énorme
vast|immense
rural|rural
urban|urbain
domestic|domestique / national
annual|annuel
long-term|à long terme
loose|lâche / ample
neat|soigné / propre
steep|raide (pente)
anniversary|anniversaire (de mariage, etc.)
budget|budget
debt|dette
loan|prêt
income|revenu
wage|salaire
fee|frais
expense|dépense
insurance|assurance
saving|économie
purchase|achat
refund|remboursement
priority|priorité
outcome|résultat
approach|approche
aspect|aspect
concern|inquiétude
circumstance|circonstance
crisis|crise
conflict|conflit
criticism|critique
feedback|retour / avis
reputation|réputation
privacy|vie privée
freedom|liberté
courage|courage
enthusiasm|enthousiasme
imagination|imagination
sympathy|compassion
anger|colère
joy|joie
shame|honte
relief|soulagement
desire|désir / envie
nightmare|cauchemar
delay|retard
crash|accident / collision
incident|incident
fault|faute / défaut
failure|échec
excuse|excuse
session|séance
venue|lieu (d'événement)
facility|équipement / installation
household|foyer / ménage
housing|logement
resident|habitant
citizen|citoyen
landscape|paysage
wildlife|faune
shade|ombre (fraîche)
shadow|ombre
silence|silence
rhythm|rythme
tone|ton
volume|volume
to cancel|annuler
password|mot de passe
contract|contrat
deadline|date limite
confidence|confiance en soi
apology|excuses`,
};
const PHRASES = {
A2: `never mind|laisse tomber
no worries|pas de souci
see you later|à plus tard
of course|bien sûr
I don't mind|ça m'est égal
excuse me|excusez-moi
could you repeat that?|tu peux répéter ?
how much is it?|combien ça coûte ?`,
B1: `it depends|ça dépend
it doesn't matter|ce n'est pas grave
by the way|au fait
it's up to you|c'est toi qui vois
what do you mean?|qu'est-ce que tu veux dire ?
I'm not sure|je ne suis pas sûr
so far|jusqu'ici
as soon as possible|dès que possible
on purpose|exprès
in the meantime|en attendant`,
B2: `how come?|comment ça se fait ?
to be about to|être sur le point de
to take place|avoir lieu
to make up one's mind|se décider
to keep in touch|garder le contact
I can't stand it|je ne supporte pas ça
it's not worth it|ça ne vaut pas le coup
to be fed up with|en avoir marre de
to make sense|avoir du sens
to take it easy|y aller doucement / se détendre`
};
