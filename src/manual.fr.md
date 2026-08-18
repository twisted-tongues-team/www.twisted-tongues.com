# **Table des matières** {#table-of-contents}

[Table des matières](#table-of-contents)

[1 Se connecter](#1-logging-in)

[2 Projets](#2-projects)

[2.1 Ouvrir un projet](#2.1-opening-a-project)

[2.2 Ajouter un nouveau projet](#2.2-adding-a-new-project)

[3 Modèles](#3-templates)

[3.1 Ajouter un modèle](#3.1-adding-a-template)

[3.2 Types de pistes](#3.2-track-types)

[4 Passages](#4-passages)

[4.1 Créer un passage](#4.1-creating-a-passage)

[4.2 Saisir des données dans un passage](#4.2-entering-data-into-a-passage)

[4.3 Raccourcis clavier pour la saisie de données](#4.3-keyboard-shortcuts-for-data-entry)

[4.4 Saisie T2IPA](#4.4-t2ipa-entry)

[4.5 Saisie de la ligne de glose](#4.5-gloss-line-entry)

[4.6 Exporter des passages](#4.6-exporting-passages)

[5 Recherche de mots](#5-word-search)

[5.1 Options de recherche](#5.1-search-options)

[5.1.1 Chaînes de caractères ou expressions régulières (RegEx)](#5.1.1-strings-versus-regex)

[5.1.2 Recherche sensible ou non aux diacritiques](#5.1.2-search-sensitive-to-diacritics,-or-not)

[5.1.3 Rechercher les phrases agrammaticales et inappropriées](#5.1.3-searching-ungrammatical-and-infelicitous-sentences)

[5.2 Rechercher par nom de piste](#5.2-search-by-track-name)

[5.3 Rechercher dans plusieurs pistes](#5.3-search-multiple-tracks)

[5.4 Bouton « Context »](#5.4-context-button)

[5.5 Rechercher et remplacer](#5.5-find-and-replace)

[5.6 Exporter les phrases trouvées](#5.6-exporting-searched-sentences)

[6 Dictionnaire](#6-dictionary)

[7 Permissions](#7-permissions)

[7.1 Rédacteurs](#7.1-writers)

[7.2 Lecteurs](#7.2-readers)

[8 Des questions ?](#8-questions?)

*N.B. : l'interface de Twisted Tongues est en anglais. Dans ce manuel, les noms de boutons et d'onglets sont donc cités en anglais, tels qu'ils apparaissent à l'écran, accompagnés d'une traduction française lors de leur première mention.*

## 1 Se connecter {#1-logging-in}

Toute personne peut se connecter à TT au moyen d'un compte de messagerie Google OAuth (n'importe quel compte Google Workspace ou compte Gmail). Une fois connecté (figure 1), l'utilisateur a accès à tous les projets (voir section 2) créés par ce compte de messagerie ou partagés avec lui. L'utilisateur peut accéder aux projets soit en cliquant sur le bouton bleu « Your Projects » (vos projets) au milieu de la page d'accueil, soit en cliquant sur l'onglet « Projects » (projets) en haut de la page.

Figure 1\. Page d'accueil après connexion.
![](images/figure_001_landing_page_after_login.png)

## 2 Projets {#2-projects}

### 2.1 Ouvrir un projet {#2.1-opening-a-project}

Les projets sont des ensembles de passages associés à un même projet de recherche. Il est recommandé de créer un projet distinct pour chaque langue dont les données sont saisies dans TT. Les projets peuvent être consultés depuis l'onglet « Projects » (figure 2). Dans cet onglet, l'utilisateur voit la liste de tous les projets qu'il a créés, ainsi que ceux qui ont été partagés avec lui. Pour chaque projet de l'onglet « Projects », trois options sont disponibles : 1\) « Delete » (supprimer), qui supprime définitivement le projet pour tous les utilisateurs (seul le propriétaire du projet peut le faire) ; 2\) « Open » (ouvrir), qui permet de consulter le dictionnaire (« Dictionary »), la recherche de mots (« Word Search ») et les passages (« Passages ») de ce projet, et d'y saisir de nouvelles données ; et 3\) « Clone » (cloner), qui télécharge une copie complète de l'état actuel de la base de données, consultable hors ligne ou utilisable comme sauvegarde. (Un bouton « Edit » (modifier) apparaît également, mais il est actuellement désactivé : le nom et la description d'un projet ne peuvent pas être modifiés après leur création.)

Figure 2\. Onglet « Projects ».
![](images/figure_002_projects_tab.png)

À l'ouverture d'un projet (figure 3), l'utilisateur voit au milieu de la page les boutons « Dictionary » et « Passages », utiles pour parcourir les données, ainsi qu'un menu en haut de l'écran comprenant les onglets « Dictionary », « Word Search », « Passages » et « Templates » (modèles) — ce dernier n'est visible que pour les « writers » (rédacteurs) du projet. Chacun de ces onglets est présenté tour à tour, à partir de la section 3.

Figure 3\. Menu à l'ouverture d'un projet.
![](images/figure_003_project_menu.png)

### 2.2 Ajouter un nouveau projet {#2.2-adding-a-new-project}

Pour créer un nouveau projet, rendez-vous dans l'onglet « Projects » et cliquez sur « Add Project » (ajouter un projet).

Une fenêtre contextuelle apparaît (figure 4). Dans le champ « Project Name », l'utilisateur peut saisir le nom qu'il souhaite donner au nouveau projet. Dans le champ « Project Description », il peut saisir une description du projet. Seul le nom du projet est obligatoire pour créer un nouveau projet. Cliquez sur le bouton « Submit » (valider) pour terminer l'ajout du projet. Le nouveau projet apparaîtra dans la liste des projets.

Figure 4\. Fenêtre « Add project ».  
![](images/figure_004_add_project_dialog.png)

## 3 Modèles {#3-templates}

L'onglet « Templates » permet de créer un ou plusieurs modèles de saisie, destinés à être utilisés lors de la saisie de données dans l'onglet « Passages » (voir section 4). L'utilisation de modèles est fortement recommandée afin de garantir la cohérence des noms et des types de pistes entre les passages d'un même projet.

### 3.1 Ajouter un modèle {#3.1-adding-a-template}

Après avoir cliqué sur « Templates », l'utilisateur peut cliquer sur « Add Template » (ajouter un modèle) pour créer un nouveau modèle (figure 5).

Figure 5\. Onglet « Templates ».  
![](images/figure_005_templates_tab.png)

Les étapes de création d'un modèle sont les suivantes :

1. L'utilisateur est invité à nommer le modèle (figure 6).  
2. Cliquez sur « Add Tracks » (ajouter des pistes) autant de fois qu'il y a de lignes (pistes) distinctes souhaitées pour chaque énoncé saisi dans la base de données (figure 7). Une fois une piste créée, l'utilisateur revient à la fenêtre du nom du modèle, où il peut ajouter une autre piste ou cliquer sur « Submit » pour enregistrer le modèle (figure 8). Par exemple, pour saisir une glose classique sur trois lignes, on ajoutera trois pistes à un même modèle, nommées par exemple « IPA » (API), « Gloss » (glose) et « Translation » (traduction) (figure 9).   
3. Pour chaque piste ajoutée, choisissez un nom (« name ») et un type (« type »). Le champ « name » est libre ; il sera utilisé et référencé dans l'onglet « Word Search » (section 5) et l'onglet « Dictionary » (section 6). Les types de pistes, choisis dans une liste déroulante, sont présentés à la section 3.2.  
4. Après avoir ajouté toutes les pistes souhaitées pour un modèle donné, cliquez sur « Submit » pour enregistrer le modèle. Le nouveau modèle s'ajoute alors à la liste des modèles (figure 10).

Notez que, même si les modèles sont recommandés, il est aussi possible d'ajouter des pistes distinctes (avec des noms \+ types différents) indépendamment pour chaque passage dans l'onglet « Passages ».

Figure 6\. Ajouter un modèle.
![](images/figure_006_add_template.png)

Figure 7\. Ajouter une piste.
![](images/figure_007_add_track.png)

Figure 8\. Nommer la piste.  
![](images/figure_008_name_the_track.png)

Figure 9\. Ajout de trois pistes (pour enregistrer le modèle, cliquez sur « Submit »).
![](images/figure_009_adding_three_tracks.png)

Figure 10\. Le nouveau modèle figure dans la liste des modèles.  
![](images/figure_010_new_template_in_list.png)

### 3.2 Types de pistes {#3.2-track-types}

Le type (« type ») détermine la manière dont les données sont saisies et alignées pour la piste concernée. Toutes les pistes de type « Text » (texte) et « T2IPA » sont alignées entre elles aux frontières de mots. Elles conviennent le mieux aux transcriptions \+ gloses correspondantes, et éventuellement aux étiquettes propres à un morphème ou à un mot. Le type « Full sentence » (phrase complète), en revanche, offre un unique champ de texte pour chaque énoncé ; il convient le mieux aux traductions et aux notes. Dans les pistes de type « Text » et « Full sentence », tout caractère Unicode peut être saisi et sera affiché et exporté correctement. Dans les pistes de type « T2IPA », l'utilisateur saisit un code pour les caractères de l'API (alphabet phonétique international) fondé sur le [paquet LaTeX tipa](https://jon.dehdari.org/tutorials/tipachart_mod.pdf) ; le rendu apparaît alors sous le code saisi dans les onglets « Passages » et « Word Search ». Les données saisies dans n'importe quel type de piste s'exportent correctement vers n'importe quel format d'export (ainsi, que votre ligne API soit saisie dans une piste de type « Text » ou « T2IPA », elle sera exportée correctement aussi bien en texte brut qu'au format LaTeX). Le nombre de modèles n'est pas limité. 

## 4 Passages {#4-passages}

Les passages peuvent être découpés de la manière qui paraît la plus pertinente pour un projet donné. Chaque passage peut correspondre à un texte, à une séance d'élicitation, ou à un ensemble de données plus grand ou plus petit. Les passages sont constitués de phrases, elles-mêmes constituées de pistes.

### 4.1 Créer un passage {#4.1-creating-a-passage}

Pour créer un passage, allez dans l'onglet « Passages » et cliquez sur « Add Passage » (ajouter un passage). Nommez le passage et décrivez-le. Si vous le souhaitez, les métadonnées du passage peuvent être conservées dans la description (« Description »). Il est recommandé, lors de la création d'un passage, de choisir un *modèle* de pistes défini au préalable (voir section 3), qui sera présent dans chaque phrase de ce passage. Pour choisir un modèle, sélectionnez-le dans le menu déroulant « Tracks from template » (pistes issues d'un modèle) (figure 11). L'utilisateur peut aussi sélectionner « None » (aucun) dans le menu déroulant et personnaliser les pistes ajoutées pour ce passage précis. Après un clic sur « Submit », le passage est créé et ajouté à la liste des passages dans l'onglet « Passages » (figure 12). Le nom et la description d'un passage peuvent être modifiés en cliquant sur « Edit » à côté du passage concerné dans l'onglet « Passages ». Un passage peut être supprimé en cliquant sur « Delete » (supprimer) à côté de son nom dans l'onglet « Passages », puis en confirmant que l'on souhaite le supprimer définitivement (figure 13).

Figure 11\. Ajouter un passage et sélectionner un modèle.  
![](images/figure_011_add_passage_and_select_template.png)

Figure 12\. Liste des passages.  
![](images/figure_012_list_of_passages.png)

Figure 13\. Supprimer un passage.  
![](images/figure_013_delete_passage.png)

### 4.2 Saisir des données dans un passage {#4.2-entering-data-into-a-passage}

Dans l'onglet « Passages », un clic sur « Open » à côté d'un passage permet d'en consulter et d'en modifier les données. Si aucune donnée n'a encore été saisie pour le passage sélectionné, celui-ci est vide. Pour ajouter des phrases à remplir, cliquez sur « Add sentence » (ajouter une phrase). Si un modèle a été choisi pour le passage, les pistes associées apparaissent à l'ajout d'une phrase. Il suffit alors de taper pour saisir les données de la phrase. Chaque nouvelle phrase ajoutée est par défaut marquée comme grammaticale (« Grammatical »), avec une case cochée dans le coin supérieur gauche de l'énoncé. Pour marquer une phrase comme agrammaticale, décochez la case. Dès que des données sont ajoutées à une phrase (figure 14), le bouton vert « clean » (propre) devient un bouton jaune « dirty » (non sauvegardé), ce qui signifie que les données ajoutées ne sont pas encore enregistrées (figure 15). Avant de quitter la page, il vous sera proposé d'enregistrer toutes les données nouvellement saisies. En cas de conflit — plusieurs utilisateurs tentant de modifier la même phrase simultanément, ou un même utilisateur essayant d'enregistrer deux versions de la même phrase avant que la page n'ait sauvegardé la première modification —, un bouton rouge « Conflict » (conflit) peut apparaître (figure 16). Dans ce cas, il suffit d'actualiser la page. Pour ajouter d'autres données, cliquez sur « Add sentence » et répétez la procédure ci-dessus.

Figure 14\. Ajouter une phrase, avant la saisie des données.  
![](images/figure_014_add_sentence_empty.png)

Figure 15\. Ajout de données à un passage, avant enregistrement.  
![](images/figure_015_adding_data_before_saving.png)

Figure 16\. Bouton « Conflict ».  
![](images/figure_016_conflict_button.png)

### 4.3 Raccourcis clavier pour la saisie de données {#4.3-keyboard-shortcuts-for-data-entry}

Lorsque le curseur se trouve dans une piste de type « Text », la barre d'espace permet de passer au mot suivant de la phrase. La touche tabulation permet quant à elle de descendre verticalement à la piste suivante. Ces raccourcis accélèrent considérablement la saisie : il n'est pas nécessaire de cliquer sur chaque cellule pour remplir chaque transcription, glose, etc.

### 4.4 Saisie T2IPA {#4.4-t2ipa-entry}

Dans une piste de type « T2IPA », les données doivent être saisies sous forme de code suivant les [conventions du paquet LaTeX tipa](http://www.l.u-tokyo.ac.jp/~fkr/tipa/tipaman.pdf). Les caractères rendus apparaissent sur la ligne immédiatement en dessous, intitulée « (rendered) » (rendu). Un X en exposant s'obtient en saisissant « ^{X} » (sans les guillemets). Les diacritiques peuvent être ajoutés à l'aide de raccourcis clavier (é) ou en notation tipa (\\’e). Pour tout code tipa commençant par \\ (à l'exception des diacritiques \~, ‘ et \`), une espace doit être saisie après la fin du code, avant le code du segment suivant. Plusieurs diacritiques peuvent être ajoutés à un même segment sans difficulté ; le rendu sera correct dans la base de données comme à l'export. À titre d'exemple, le code « \\textltailn On^{w}O » produit le rendu « ɲɔnwɔ ». Au sein d'une même cellule d'une piste T2IPA, les tirets qui ne font pas partie d'un code tipa sont interprétés comme des frontières de morphèmes et segmentés comme tels dans le dictionnaire morphème par morphème. Les signes égal « = » sont interprétés comme des frontières de clitiques et sont eux aussi segmentés dans le dictionnaire.

### 4.5 Saisie de la ligne de glose {#4.5-gloss-line-entry}

Dans toute piste de type « Text », les majuscules sont exportées en petites capitales à des fins de glose, conformément aux [règles de glose de Leipzig](https://www.eva.mpg.de/lingua/pdf/Glossing-Rules.pdf). Les tirets au sein d'une même cellule sont interprétés comme des frontières de morphèmes et segmentés comme tels dans le dictionnaire. Les signes égal « = » sont interprétés comme des frontières de clitiques et sont eux aussi segmentés dans le dictionnaire.

### 4.6 Exporter des passages {#4.6-exporting-passages}

Pour exporter un passage, cliquez sur « Select All » (tout sélectionner) en haut à droite du passage concerné, puis sur « Export » (exporter), juste en dessous de « Select All ». Pour exporter une ou plusieurs phrases d'un passage, cochez la case à droite des phrases à exporter, puis cliquez sur « Export ». Une fenêtre contextuelle apparaît alors (figure 17), dans laquelle l'utilisateur peut choisir l'un des trois modes d'export : LaTeX, tableau formaté (« Formatted Table ») ou tabulations formatées (« Formatted Tabs »). L'export LaTeX suppose l'utilisation des paquets LaTeX tipa et gb4e. Les tableaux formatés sont du texte brut mis en forme en tableau, garantissant un alignement correct des transcriptions \+ gloses une fois copiés dans un tableur ou un logiciel de traitement de texte. Les tabulations formatées sont similaires, mais avec une tabulation entre chaque mot au lieu d'une mise en forme en tableau. L'utilisateur peut également choisir quelles pistes exporter. Par exemple, une piste de notes ou de catégories syntaxiques peut être utile pour les recherches dans la base, sans que l'on souhaite l'exporter pour publication. Pour chaque nom de piste, un menu déroulant permet de choisir d'exporter ou non cette piste. Dans ce même menu, pour chaque piste de type « Text » ou « T2IPA », l'utilisateur peut choisir un export en mode IPA (recommandé pour toute ligne écrite en API, qu'elle soit saisie dans une piste « Text » ou « T2IPA ») ou en mode Gloss. Ce choix détermine la manière dont les caractères spéciaux sont exportés.

Figure 17\. Export de phrases au format LaTeX.  
![](images/figure_017_sentence_export_in_latex_format.png)

## 5 Recherche de mots {#5-word-search}

L'onglet « Word Search » (recherche de mots) permet de rechercher dans le contenu de tous les passages des chaînes de caractères, ou d'utiliser des [expressions régulières](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Regular_expressions) (RegEx). N'importe quel nom de piste (voir section 3) de n'importe quel passage peut être interrogé, et plusieurs pistes peuvent être interrogées simultanément. Cet onglet permet aussi de rechercher et remplacer des chaînes de caractères dans l'ensemble du projet.

### 5.1 Options de recherche {#5.1-search-options}

Deux boutons bleus « toggle » (basculer) figurent en haut de la page « Word Search ». Cette section décrit leurs fonctions respectives. 

#### 5.1.1 Chaînes de caractères ou expressions régulières (RegEx) {#5.1.1-strings-versus-regex}

En haut à gauche de l'onglet « Word Search » se trouve un bouton bleu « toggle », réglé par défaut sur la recherche de chaînes de caractères (« String Search ») (figure 18). Ce réglage par défaut permet de taper n'importe quelle chaîne de caractères dans la barre de recherche et de chercher cette chaîne dans le contenu de tous les passages. Un clic sur « toggle » permet de rechercher au moyen d'[expressions régulières](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Regular_expressions), ce qui facilite par exemple la recherche de caractères ou de gloses uniquement en début ou en fin de mot, ou l'ajout d'un opérateur « ou » dans la recherche.

Figure 18\. Recherche de mots.
![](images/figure_018_word_search.png)

#### 5.1.2 Recherche sensible ou non aux diacritiques {#5.1.2-search-sensitive-to-diacritics,-or-not}

Le second bouton bleu « toggle » en haut de la page « Word Search » détermine si la recherche est sensible aux diacritiques de la chaîne recherchée. En mode sensible aux diacritiques, taper « a » dans la barre de recherche renvoie toutes les phrases contenant un \[a\] sans diacritique dans la piste choisie. En mode insensible aux diacritiques, taper « a » renvoie toutes les phrases contenant un \[a\] portant un nombre quelconque de diacritiques dans la piste choisie, y compris \[á, à, â, a\], etc.

#### 5.1.3 Rechercher les phrases agrammaticales et inappropriées {#5.1.3-searching-ungrammatical-and-infelicitous-sentences}

Les phrases d'un passage peuvent être marquées (en cochant la case correspondante) comme agrammaticales (le fond de la phrase devient alors rouge) ou comme pragmatiquement inappropriées (« infelicitous » ; le fond devient alors jaune). Les phrases agrammaticales sont exportées précédées d'un astérisque, et les phrases inappropriées précédées d'un croisillon (#). Dans l'onglet « Word Search », pour restreindre la recherche aux seules phrases grammaticales, appropriées, agrammaticales ou inappropriées, sélectionnez la case grise correspondante au-dessus des résultats de recherche ; par défaut, toutes les phrases, y compris agrammaticales et inappropriées, apparaissent dans les résultats.

### 5.2 Rechercher par nom de piste {#5.2-search-by-track-name}

Lors d'une recherche, l'utilisateur doit choisir un nom de piste dans le menu déroulant (figure 19). Tous les noms de pistes de tous les passages devraient figurer dans ce menu. Si deux pistes portent des noms très proches mais non identiques, les deux apparaissent dans le menu déroulant et doivent être interrogées séparément. C'est pourquoi il est recommandé de définir les noms de pistes au moyen de modèles, plutôt que de créer de nouveaux noms de pistes pour chaque passage.

Figure 19\. Menu déroulant.  
![](images/figure_019_drop_down_menu.png)

### 5.3 Rechercher dans plusieurs pistes {#5.3-search-multiple-tracks}

Il est possible d'interroger plusieurs pistes simultanément. Par exemple, s'il existe plusieurs allomorphes du pluriel et que l'on veut voir tous les cas où le morphème PL se prononce \[a\], on recherchera en même temps la chaîne « PL » dans la piste « Gloss » et la chaîne « a » dans la piste « IPA ». L'utilisateur peut interroger autant de pistes qu'il le souhaite simultanément, mais les résultats ne comprendront que les phrases contenant TOUTES les chaînes recherchées, ou correspondant à TOUTES les expressions régulières recherchées (figure 20).

Figure 20\. Recherche dans plusieurs pistes.
![](images/figure_020_search_multiple_tracks.png)

### 5.4 Bouton « Context » {#5.4-context-button}

À côté de chaque phrase correspondant à une recherche donnée figure un bouton « Context » (contexte) (cf. figure 18). Un clic sur ce bouton amène l'utilisateur à l'emplacement de cette phrase au sein de son passage. La phrase concernée apparaît en haut de la page (sauf si elle figure parmi les neuf dernières phrases d'un passage, auquel cas elle peut ne pas être tout en haut), et l'utilisateur peut consulter le contexte plus large dans lequel cette phrase a été prononcée.

### 5.5 Rechercher et remplacer {#5.5-find-and-replace}

Dans l'onglet « Word Search », lorsqu'une chaîne ou une expression régulière donnée trouve des correspondances, l'utilisateur peut choisir de remplacer cette chaîne, dans les phrases correspondantes, par une autre chaîne, à l'aide des champs en haut de l'écran, là où il est écrit « In words in this track, replace \_\_\_\_ with \_\_\_\_ » (dans les mots de cette piste, remplacer \_\_\_\_ par \_\_\_\_). Les champs peuvent être remplis avec n'importe quelle chaîne de caractères (figure 21). Notez que cette modification écrase ce qui avait été saisi auparavant dans les phrases concernées. Après avoir rempli les champs et cliqué sur « Replace » (remplacer), l'utilisateur est invité à confirmer la modification (figure 22). Si la modification porte sur un grand nombre de phrases, le site peut mettre quelques minutes à charger pendant le traitement.

Il est conseillé d'utiliser l'outil « rechercher et remplacer » avec prudence : une fois le remplacement effectué, l'utilisateur n'a plus accès aux formes antérieures.

Figure 21\. Rechercher et remplacer, étape 1\.  
![](images/figure_021_find_and_replace_step_1.png)

Figure 22\. Rechercher et remplacer, étape 2\.  
![](images/figure_022_find_and_replace_step_2.png)

### 5.6 Exporter les phrases trouvées {#5.6-exporting-searched-sentences}

Pour exporter les résultats d'une recherche, on peut sélectionner des phrases individuelles à l'aide de la case à cocher à droite de chaque phrase, ou cliquer sur « Select All » en haut à droite de la page, puis cliquer sur « Export » sous le bouton « Select All » et procéder comme indiqué à la section 4.6.

## 6 Dictionnaire {#6-dictionary}

En cliquant sur l'onglet « Dictionary » (dictionnaire), l'utilisateur voit la liste alphabétique de tous les mots distincts du dictionnaire. Les mots sont définis comme l'ensemble des caractères saisis dans un même champ de n'importe quelle piste de type « T2IPA » ou « Text » de l'onglet « Passages ». Toute différence de caractère entre deux mots produit deux entrées distinctes dans le dictionnaire. Pour afficher chaque morphème séparément, plutôt que chaque mot, cliquez sur le bouton bleu « Switch to Morpheme » (passer aux morphèmes) en haut de la page (figure 23). Les morphèmes sont définis comme des mots, ou des parties de mots séparées par un tiret ou un signe égal. À condition que le nombre de tirets soit le même sur la ligne API et sur la ligne de glose, les gloses s'alignent correctement avec les transcriptions de chaque morphème dans le dictionnaire. Lorsque le nombre de morphèmes ne correspond ***pas*** entre la ligne API et la ligne de glose, les formes concernées sont surlignées en rouge dans l'onglet « Dictionary ». C'est un outil utile pour repérer les erreurs de saisie.

À côté de chaque entrée du dictionnaire figure un bouton indiquant le nombre d'occurrences de ce mot distinct dans les passages du projet. Un clic sur ce nombre d'occurrences mène à la liste de toutes les phrases contenant ce mot ou ce morphème. Ces phrases peuvent être consultées dans le contexte de leur passage en cliquant sur « Context » à côté d'une phrase donnée, exactement comme dans l'onglet « Word Search » (section 5.4).

Figure 23\. Fonction de recherche du dictionnaire.
![](images/figure_023_dictionary_search_function.png)

Le dictionnaire complet peut être téléchargé en cliquant sur « Export to CSV » (exporter en CSV) sur la page « Dictionary » (figure 23).

## 7 Permissions {#7-permissions}

Chaque projet n'est accessible qu'à son créateur et aux personnes auxquelles celui-ci a donné accès. Le créateur peut accorder l'accès à un projet en cliquant sur le bouton « Share » (partager) en haut à droite de l'écran, dans le projet concerné (figure 24). Choisissez le type d'accès souhaité — « reader » (lecteur) ou « writer » (rédacteur) — dans le menu déroulant, puis saisissez l'adresse électronique de la personne à qui l'accès est accordé (figure 25). Veillez à ce qu'il n'y ait pas d'espace avant ou après l'adresse saisie. Cliquez sur « Submit » : cette personne peut désormais se connecter avec son compte de messagerie et consulter le projet.

Figure 24\. Partager un projet.
![](images/figure_024_sharing_a_project.png)

Figure 25\. Ajouter un lecteur.  
![](images/figure_025_add_reader.png)

### 7.1 Rédacteurs {#7.1-writers}

Les rédacteurs (« writers ») sont les personnes disposant des droits de modification sur le projet. Presque toutes les fonctions accessibles au créateur du projet le sont aussi aux rédacteurs.

### 7.2 Lecteurs {#7.2-readers}

Les lecteurs (« readers ») sont les personnes qui peuvent consulter un projet mais non le modifier. Les lecteurs peuvent consulter et exporter les données comme les rédacteurs, mais ne peuvent pas en ajouter.

## 8 Des questions ? {#8-questions?}

Pour toute question sur le site, ou si quelque chose ne fonctionne pas comme prévu, écrivez-nous à [twisted-tongues-team@googlegroups.com](mailto:twisted-tongues-team@googlegroups.com).
