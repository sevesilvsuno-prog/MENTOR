# 🎓 MENTOR — Ton professeur particulier de bourse

Application web pour iPhone, à la fois **école de bourse** et **conseiller pédagogique quotidien**, animée par une vraie IA (Gemini, niveau gratuit, avec recherche Google intégrée). Conçue pour un **débutant absolu** : elle t'amène de zéro jusqu'à tes premiers placements réels, puis t'accompagne chaque jour.

> ⚠️ **Outil pédagogique. Ceci n'est pas un conseil en investissement** (application non agréée AMF). Investir comporte un risque de perte en capital. MENTOR ne passe jamais d'ordres et ne demande jamais d'identifiants bancaires.

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | Toute l'application (HTML + CSS + JavaScript, aucune dépendance) |
| `sw.js` | Service worker : ouverture hors-ligne (leçons, journal, portefeuille) |
| `manifest.json` | Manifeste PWA (nom, icône, plein écran) |

## 1. Déploiement sur GitHub Pages (pas à pas)

1. Crée un compte sur [github.com](https://github.com) si tu n'en as pas (gratuit).
2. En haut à droite : **+** → **New repository**. Nom : `mentor` (par exemple). Coche **Public**. Bouton **Create repository**.
3. Sur la page du dépôt : **uploading an existing file** (ou bouton **Add file → Upload files**).
4. Glisse (ou sélectionne) les **3 fichiers** : `index.html`, `sw.js`, `manifest.json`. Bouton vert **Commit changes**.
5. Onglet **Settings** du dépôt → menu **Pages** (colonne de gauche).
6. Sous *Branch* : choisis `main` et `/ (root)`, puis **Save**.
7. Attends 1 à 2 minutes. Ton app est en ligne à l'adresse :
   `https://TON-PSEUDO.github.io/mentor/`

Pour mettre à jour l'app plus tard : re-téléverse les fichiers (Add file → Upload files) — GitHub Pages se met à jour tout seul.

## 2. Installation sur l'écran d'accueil de l'iPhone

1. Ouvre l'adresse de ton app dans **Safari** (pas Chrome : c'est important sur iOS).
2. Touche le bouton **Partager** (le carré avec une flèche vers le haut).
3. Fais défiler et touche **« Sur l'écran d'accueil »**, puis **Ajouter**.
4. MENTOR apparaît comme une vraie app, en plein écran, avec sa propre icône.

> Limite connue : Safari peut ignorer l'icône intégrée (en data-URI) sur l'écran d'accueil et afficher une capture de la page à la place. Optionnel : ajoute un fichier `icon.png` (180×180) dans le dépôt et remplace, dans `index.html`, le `href` de la ligne `apple-touch-icon` par `./icon.png`.

## 3. Obtenir tes deux clés (gratuites) — le tutoriel intégré te guide aussi

**Clé Gemini (l'intelligence)** :
1. Ouvre [aistudio.google.com/apikey](https://aistudio.google.com/apikey) et connecte-toi avec un compte Google.
2. **Get API key** → **Create API key** → copie la clé (nouveau format `AQ.…`, ou ancien format `AIza…` — les deux fonctionnent).
3. Colle-la dans MENTOR quand l'app te le demande, et touche **Tester la clé**.

> 💡 MENTOR choisit automatiquement un modèle Gemini disponible (alias `gemini-flash-latest` en priorité) et bascule tout seul si Google retire un modèle : pas de réglage à faire.

**Clé Twelve Data (les cours de bourse)** :
1. Ouvre [twelvedata.com](https://twelvedata.com/pricing) → **Get free API key**, inscris-toi.
2. Sur ton **Dashboard**, copie la clé API.
3. Colle-la dans MENTOR → **Tester la clé** (l'app affiche le cours d'Apple en direct comme preuve).

🔒 Les clés restent **uniquement sur ton téléphone** (localStorage). Sur le niveau gratuit de Gemini, Google peut utiliser les échanges pour améliorer ses modèles : **ne saisis jamais de données bancaires ou d'identifiants** dans le chat.

## 4. Sauvegarde et restauration (iCloud)

Une web app iOS ne peut pas écrire silencieusement dans iCloud — MENTOR automatise donc le maximum :

- **Chaque jour**, à la première ouverture, l'app génère `mentor-sauvegarde-AAAA-MM-JJ.json` et ouvre la feuille de partage iOS : un tap sur **« Enregistrer dans Fichiers »** → **iCloud Drive** → dossier **MENTOR** (crée-le la première fois), et c'est réglé.
- Un indicateur dans **Profil** montre la fraîcheur de ta dernière sauvegarde (ambre à 3 jours, alerte à 7).
- **Restaurer** : Profil → **Restaurer une sauvegarde** → choisis le fichier dans iCloud Drive → **remplacer** ou **fusionner**. Un résumé confirme ce qui est revenu.
- Export manuel possible à tout moment (Profil → Sauvegarder maintenant).

## 5. Limites connues (assumées, niveau gratuit oblige)

- **Euronext Paris n'est pas couvert** par le plan gratuit Twelve Data : les cours des lignes françaises sont des **clôtures de veille** recherchées par l'IA à chaque briefing (horodatées « Clôture du JJ/MM ») et corrigeables à la main.
- **Quotas gratuits** : Gemini peut répondre « limite atteinte » aux heures de pointe (réessaie quelques minutes plus tard ; les quotas journaliers se rechargent vers 9 h heure française) ; Twelve Data est limité à 8 requêtes/minute — l'app met tout en cache et ne « mitraille » jamais.
- **Recherche Google** : sur le niveau gratuit de Gemini, l'outil de recherche a son **propre quota, bien plus bas** que celui de l'IA (parfois zéro selon les comptes). Quand il est atteint, MENTOR bascule automatiquement en mode « sans recherche » : le briefing est quand même généré, avec un bandeau t'avertissant que les infos peuvent dater. Nouvel essai automatique chaque jour (état visible dans Profil → Réglages).
- **Hors-ligne** : leçons, glossaire, journal et portefeuille (derniers cours connus) restent consultables ; le briefing et le chat ont besoin d'internet.
- Les totaux en euros des lignes américaines utilisent le taux EUR/USD du dernier rafraîchissement.
- Tout est stocké dans Safari (localStorage) : si tu effaces les données de Safari sans sauvegarde, tout est perdu — d'où le rituel quotidien de sauvegarde.
- L'IA peut se tromper : c'est un professeur, pas un oracle. Les briefings citent leurs sources — vérifie ce qui compte.

## 6. Camille te fait la lecture 🧑‍🏫

Pour ceux qui n'ont pas le courage de lire : chaque bloc de texte (leçons, briefings, définitions, réponses du chat…) porte un petit portrait de **Camille** — prénom mixte : sa voix peut être **d'homme ou de femme**, à ton choix. Un tap → lecture à voix haute ; re-tap → pause. Une barre en bas de l'écran permet de mettre en pause ou d'arrêter.

Camille a **deux voix**, réglables dans Profil → Camille te fait la lecture :

- **📱 Voix du téléphone** (par défaut) : 100 % locale et gratuite, illimitée. ⚠️ La voix iOS par défaut est la version « compacte », robotique. Pour la transformer (2 minutes, gratuit) : Réglages iOS → **Accessibilité → Contenu énoncé → Voix → Français** → choisis **Thomas** (homme) ou **Audrey** (femme) → télécharge la version **« améliorée »** ou **Premium**. Attention au piège iOS : deux voix du même nom apparaissent ensuite — dans MENTOR, prends celle marquée **✦ qualité** (l'app te la fait entendre dès la sélection). Si une voix téléchargée n'apparaît pas dans la liste : bouton « ↻ Rafraîchir la liste des voix », et au besoin ferme complètement l'app et rouvre-la.
- **✨ Voix Gemini** : générée par les modèles TTS de Gemini avec ta clé — qualité studio, 8 timbres au choix (4 voix d'homme, 4 voix de femme). Limite : quota gratuit serré (quelques lectures/jour) et démarrage en 5-15 s.
- **🎙️ Voix ElevenLabs (la plus belle)** : la référence mondiale des voix naturelles, intégrée en direct. Crée une clé gratuite sur [elevenlabs.io](https://elevenlabs.io) (~10 000 caractères/mois ≈ 10 minutes de lecture), colle-la dans Profil → Camille → ElevenLabs, « Tester la clé et charger les voix », puis choisis ta voix (hommes et femmes, français superbe). Démarrage rapide, vraie pause/reprise. Quota atteint → retour automatique à la voix du téléphone, nouvel essai après le renouvellement.

Dans tous les cas : pendant la génération d'une voix naturelle, la barre affiche « Camille prépare la lecture ⏳ » (quelques secondes) — et une nouvelle lecture interrompt toujours proprement la précédente.

Vitesse réglable, bouton « Écouter Camille se présenter » pour tester, désactivable d'un bouton si tu préfères lire.

## 7. Le grand parcours : 50 leçons, simulateur d'époques, diplôme

L'École compte désormais **6 niveaux (50 leçons)** : fondations (1-3), atelier de l'analyste (4 : bilan, ratios, valorisation, rapport annuel…), patrimoine complet (5 : SCPI, obligations, or, assurance-vie, PER, allocation totale, règle des 4 %) et école du sang-froid (6 : krachs vécus de l'intérieur, biais rétrospectif, quand vendre, tenir 10 ans…).

Le **Simulateur d'époques** (débloqué dès 6 leçons) te fait revivre en accéléré — un mois de marché par décision — quatre périodes réelles : la bulle internet 1999-2003, la crise financière 2007-2011, le krach Covid 2019-2021 et l'inflation 2021-2023, avec les « unes » de l'époque. À la fin, ton résultat est comparé au DCA discipliné et au tout-liquide, tes ventes de panique sont détectées et expliquées, et ton professeur IA peut te débriefer. Un **mode mystère** (dates masquées) neutralise le biais rétrospectif. Les données mensuelles sont approximatives (base 100) : c'est la forme des tempêtes qui enseigne, pas le centime.

Le parcours s'étale volontairement sur **plusieurs mois** : le niveau 5 exige le niveau 4 complet + 1 voyage au simulateur ; le niveau 6 exige 2 voyages + 8 semaines d'activité ; le **défi du mois** (une étude de cas réelle, générée et notée sur 20 par l'IA) est limité à un par mois. Le **diplôme « Investisseur autonome »** couronne le tout : 50 leçons + 4 voyages + 3 défis notés.

## 8. Fournisseur d'IA alternatif (avancé)

Dans **Profil → Fournisseur d'IA (avancé)**, tu peux basculer sur l'**API Claude** (console.anthropic.com, service payant à l'usage) avec la même mécanique — recherche web comprise. Gemini reste le choix par défaut recommandé (gratuit).
