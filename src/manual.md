# **Table of Contents** {#table-of-contents}

[Table of Contents](#table-of-contents)

[1 Logging in](#1-logging-in)

[2 Projects](#2-projects)

[2.1 Opening a project](#2.1-opening-a-project)

[2.2 Adding a new project](#2.2-adding-a-new-project)

[3 Templates](#3-templates)

[3.1 Adding a template](#3.1-adding-a-template)

[3.2 Track types](#3.2-track-types)

[4 Passages](#4-passages)

[4.1 Creating a passage](#4.1-creating-a-passage)

[4.2 Entering data into a passage](#4.2-entering-data-into-a-passage)

[4.3 Keyboard shortcuts for data entry](#4.3-keyboard-shortcuts-for-data-entry)

[4.4 T2IPA entry](#4.4-t2ipa-entry)

[4.5 Gloss line entry](#4.5-gloss-line-entry)

[4.6 Exporting passages](#4.6-exporting-passages)

[5 Word Search](#5-word-search)

[5.1 Search options](#5.1-search-options)

[5.1.1 Strings versus RegEx](#5.1.1-strings-versus-regex)

[5.1.2 Search sensitive to diacritics, or not](#5.1.2-search-sensitive-to-diacritics,-or-not)

[5.1.3 Searching ungrammatical and infelicitous sentences](#5.1.3-searching-ungrammatical-and-infelicitous-sentences)

[5.2 Search by track name](#5.2-search-by-track-name)

[5.3 Search multiple tracks](#5.3-search-multiple-tracks)

[5.4 Context button](#5.4-context-button)

[5.5 Find and replace](#5.5-find-and-replace)

[5.6 Exporting searched sentences](#5.6-exporting-searched-sentences)

[6 Dictionary](#6-dictionary)

[7 Permissions](#7-permissions)

[7.1 Writers](#7.1-writers)

[7.2 Readers](#7.2-readers)

[8 Questions?](#8-questions?)

## 1 Logging in {#1-logging-in}

Anyone can login to TT using an google oauth email account (any google workspace account or gmail account). Upon logging in (Figure 1), a user will have access to all projects (see section 2) that have been created by or shared with that email account. The user can access the projects either by clicking on the blue "Your Projects" button in the middle of the landing page or by clicking on the "Projects" tab at the top of the page.

Figure 1\. Landing page after login.
![](images/image16.png)

## 2 Projects {#2-projects}

### 2.1 Opening a project {#2.1-opening-a-project}

Projects are sets of passages associated with a single research project. It is recommended that users create a different project for each distinct language for which data is entered into TT. Projects can be viewed from the “Projects” tab (Figure 2). Within the Projects tab, users will see a list of all projects they have created, as well as those that have been shared with them. For each project in the Projects tab, there are three options: 1\) Edit, which allows a user to edit the name and description of the project, 2\) Open, which allows the user to view the Dictionary, Word Search, and Passages for that project, and to enter new data, and 3\) Clone, which downloads a full copy of the current state of the database, which can be accessed from offline or used as a back-up.

Figure 2\. Projects tab.
![](images/image9.png)

Upon opening a project (Figure 3), a user will see a Dictionary and Passages buttons in the middle of the page, useful for browsing data, as well as a menu across the top of the screen, including “Dictionary, Word Search, Passages,” and “Templates” tabs (the latter is only present for “writers” (editors) of the project). Each of these tabs is discussed in turn, beginning in section 3.

Figure 3\. Menu from opening a project.
![](images/image19.png)

### 2.2 Adding a new project {#2.2-adding-a-new-project}

To create a new project, navigate to the “Projects” tab. Click “Add Project.”

A pop-up window will appear (Figure 4). In the “Project Name” box, the user can type in the name they wish to give the new project. In the “Project Description” box, the user can type in a description of the project. Only a Project Name is required to create a new project. Click the “Submit” button to finish adding the project. The new project will appear in the list of projects.

Figure 4\. “Add project” pop-up window.  
![](images/image2.png)

## 3 Templates {#3-templates}

The “Templates” tab allows a user to create a template, or multiple templates, for data entry, to be used in data entry in the Passages tab (see section 4). The use of templates is highly recommended in order to maintain consistency in track names and types across passages within a project.

### 3.1 Adding a template {#3.1-adding-a-template}

Upon clicking on “Templates” a user can click “Add Template” to create a new template (Figure 5).

Figure 5\. “Templates” tab.  
![](images/image5.png)

The steps to create a template are as follows:

1. The user will be asked to name the template (Figure 6).  
2. “Add Tracks” for the number of distinct lines (tracks) desired for each utterance entered into the database (Figure 7). Once a track is created, the user lands on the Template Name pop-up where they can add another track or click “Submit” to save the template (Figure 8). For example, if entering a traditional three-line gloss, one would add three tracks to a single template, where the three tracks are perhaps named “IPA”, “Gloss,” and “Translation” (Figure 9).   
3. For each track added, select a “name” and “type”. The “name” field is open-ended, and will be used and referred to in the Word Search tab (section 5) and Dictionary tab (section 6). Track types, selected from a drop-down list, are discussed in section 3.2.  
4. After adding all desired tracks for a particular template, click “Submit” to save the template. This will add the new template to the template list (Figure 10).

Note that when templates are recommended, it is also possible to add distinct tracks (with different names \+ types) independently for each passage in the Passages tab.

Figure 6\. Add template.
![](images/image14.png)

Figure 7\. Add track.
![](images/image25.png)

Figure 8\. Name the track.  
![](images/image6.png)

Figure 9\. Adding three tracks (to save the template, click “Submit.”)
![](images/image18.png)

Figure 10\. New template is in the template list.  
![](images/image15.png)

### 3.2 Track types {#3.2-track-types}

The “type” determines how data is entered and aligned for that particular track. All tracks of the “Text” and “T2IPA” types will be aligned with each other at word boundaries. These are best used for transcriptions \+ corresponding glosses, and perhaps morpheme- or word-specific tags. The “Full sentence” type, on the other hand, has a single text entry blank for each utterance, and is best used for translations and notes. In the Text and Full sentence track types, any unicode character can be entered and will be viewable and exportable appropriately. In the T2IPA track type, a user enters code for IPA characters based on the [tipa LaTeX package](https://jon.dehdari.org/tutorials/tipachart_mod.pdf), which then appears underneath the entered code in the Passages and Word Search tab. Data entry in any track type should export appropriately to any export type (so whether you enter your IPA line in a Text or T2IPA track type, it will export correctly to both plain text and LaTeX format). The number of templates is not limited. 

## 4 Passages {#4-passages}

Passages can be divided however the user decides makes the most sense for a given project. Each passage could correspond to a text, an elicitation session, or some larger or smaller chunk of data. Passages are made up of sentences, which are made up of tracks.

### 4.1 Creating a passage {#4.1-creating-a-passage}

To create a passage, go to the Passages tab, and click on “Add Passage”. Name the passage and describe it. If desired, passage metadata can be stored in the “Description”. It is recommended upon creating a passage to choose a previously defined *template* of tracks (see section 3), which will be present in each sentence in that passage. To choose a template, select one from the drop-down menu labelled “Tracks from template” (Figure 11). Alternatively, the user can select “None” in the drop-down menu and can customize the tracks added for the specific passage. Upon clicking “Submit”, the passage will be created and added to the list of passages in the Passages tab (Figure 12). The name and description of a passage can be edited by clicking on “Edit” next to the corresponding passage in the Passages tab. A passage can be deleted by clicking “Delete” next to the passage name in the Passages tab, and confirming that the user would like to permanently delete the passage (Figure 13).

Figure 11\. Add passage and select template.  
![](images/image22.png)

Figure 12\. List of passages.  
![](images/image3.png)

Figure 13\. Delete passage.  
![](images/image12.png)

### 4.2 Entering data into a passage {#4.2-entering-data-into-a-passage}

In the Passages tab, upon clicking “Open” next to a passage, one can view and edit the data in that passage. If no data has yet been entered for the selected passage, the passage will be empty. To add sentences to be filled in, click “Add sentence”. If a template has been selected for the passage, tracks associated with that passage will appear upon adding a sentence. One can then type to enter data into the sentence. Each new sentence added is by default marked as “Grammatical” with a checkmark in the upper left corner of the utterance. To mark a sentence as ungrammatical, un-check the box. Upon adding data to a sentence (Figure 14), the green “clean” button will change to a yellow “dirty” button, meaning that the added data is unsaved (Figure 15). Before leaving the page, you will be prompted to save all newly entered data. If there are conflicts with multiple users attempting to edit the same sentence simultaneously (or if a single user tries to save two versions of the same sentence before the page has backed up the first change), a red “Conflict” button may appear (Figure 16). If this is the case, simply refresh the page. To add additional data, click “Add sentence”, and repeat the above process.

Figure 14\. Add sentence, before typing in the data.  
![](images/image11.png)

Figure 15\. Adding data to a passage before saving.  
![](images/image24.png)

Figure 16\. Conflict button.  
![](images/image10.png)

### 4.3 Keyboard shortcuts for data entry {#4.3-keyboard-shortcuts-for-data-entry}

When a user’s cursor is in a “text”-type track, the space bar can be used to advance to the next word in the sentence. Alternatively, the tab key can be used to advance vertically down to the next track. These shortcuts greatly speed up the data entry process, such that one does not need to click on each cell to fill in each transcription, gloss, etc.

### 4.4 T2IPA entry {#4.4-t2ipa-entry}

If using a track of the type “T2IPA”, data should be entered as code following the [guidelines of the tipa LaTeX package.](http://www.l.u-tokyo.ac.jp/~fkr/tipa/tipaman.pdf) The rendered characters will appear on the line immediately below, which is labelled “(rendered)”. A superscript X can be added as “^{X}” (quotes not part of what should be entered). Diacritics can be added using keyboard shortcuts (é) or tipa notation (\\’e). For any tipa code that begins with a \\ (except the \~, ‘, and ` diacritics) a space must be entered following the end of the code, before the next segment’s code is added. Multiple diacritics can be added to a single segment with no issue. This will render correctly in the database and export function. To exemplify the entry and corresponding rendering, the code “\\textltailn On^{w}O” will result in the rendered “ɲɔnwɔ.” Within a single cell of a T1IPA track, dashes that are not part of tipa codes will be interpreted as morpheme boundaries and segmented in the morpheme-by-morpheme dictionary. Equals signs “=” will be interpreted as clitic boundaries and will also be segmented in the dictionary.

### 4.5 Gloss line entry {#4.5-gloss-line-entry}

In any text-type track, capital letters will be exported as small caps for glossing purposes, following the [Leipzig Glossing Conventions](https://www.eva.mpg.de/lingua/pdf/Glossing-Rules.pdf). Dashes within a single cell are interpreted as morpheme boundaries and segmented as such in the dictionary. Equals signs “=” are interpreted as clitic boundaries and are also segmented in the dictionary.

### 4.6 Exporting passages {#4.6-exporting-passages}

To export a passage, click “Select All” at the top right of a particular passage, and then click “Export”, right underneath “Select All”. To export one or more sentences from within a passage, click the check box on the right of the sentences you’d like to export, and then click “Export”. Upon clicking “Export”, a pop-up window will appear (Figure 17), wherein a user can choose to export in one of three modes: LaTeX, Formatted Table, or Formatted Tabs. LaTeX export assumes the use of the tipa and gb4e LaTeX passages. Formatted tables are plain text formatted in a table, resulting in correct alignment of transcriptions \+ glosses when copied into a spreadsheet or word processing software. Formatted tabs are similar, but with a tab between each word rather than formatted in a table. Users can also customize which tracks are exported. For example, you may have a track for notes or syntactic category that is useful for searching in the database, but you may not want to export these tracks for publishing. For each track name, there is a drop-down menu allowing the user to choose whether to export that track or not. In the same drop-down menu, for each Text- or TIPA2-type track the user can choose whether to export as IPA (recommended for any line written in IPA, whether using the Text-type track or the TIPA2-type track) or Gloss. This choice will determine how special characters are exported.

Figure 17\. Sentence Export in LaTeX format.  
![](images/image8.png)

## 5 Word Search {#5-word-search}

The Word Search tab allows users to search the content of all passages for strings of characters or using [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) (RegEx). Any track name (see section 3) from any passage can be searched, and multiple tracks can be searched simultaneously. This tab can also be used to find and replace strings across the entire project.

### 5.1 Search options {#5.1-search-options}

There are two blue “toggle” buttons at the top of the Word Search page. This section covers both of their functions. 

#### 5.1.1 Strings versus RegEx {#5.1.1-strings-versus-regex}

At the top left of the Word Search tab there is a blue “toggle” button, which is set to String Search by default (Figure 18). The default setting allows users to type any string of characters into the search bar and search all passage content for that string. Clicking on “toggle” allows users to instead search using [RegEx](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions), which makes it easier to search, for example, for specific characters or glosses only at the beginning or end of a word, or to add an “or” operator into the search.

Figure 18\. Word Search.
![](images/image4.png)

#### 5.1.2 Search sensitive to diacritics, or not {#5.1.2-search-sensitive-to-diacritics,-or-not}

The second blue “toggle” button at the top of the Word Search page determines whether the search is sensitive to diacritics in the search string. In the diacritic sensitive search, typing “a” into the search bar will return all sentences containing an \[a\] with no diacritic in the chosen track. In the diacritic insensitive search, typing “a” into the search bar will return all sentences containing an \[a\] with any number of diacritics in the chosen track, including \[á, à, â, a\], etc.

#### 5.1.3 Searching ungrammatical and infelicitous sentences {#5.1.3-searching-ungrammatical-and-infelicitous-sentences}

Sentences in a passage can be marked (by clicking the appropriate checkbox) as ungrammatical (in which case the sentence background turns red) or infelicitous (in which case the sentence background turns yellow). Ungrammatical sentences are exported with an initial asterisk and infelicitious ones with an initial hashtag. In the Word Search tab, if you would like to search only grammatical, only felicitious, only ungrammatical, or only infelicitous sentences, the appropriate gray box above the search results can be selected; the default is that all sentences, including ungrammatical and infelicitous ones, will appear in search results.

### 5.2 Search by track name {#5.2-search-by-track-name}

When searching, users must choose a track name from the dropdown menu (Figure 19). All track names from all passages should be present in the drop-down menu. If two tracks share very similar names, but not the same name, both will appear in the drop-down menu and must be searched independently. For this reason, users are recommended to use templates to define track names, rather than creating new track names for each passage.

Figure 19\. Drop-down menu.  
![](images/image1.png)

### 5.3 Search multiple tracks {#5.3-search-multiple-tracks}

A user may search multiple tracks simultaneously. For example, if there are multiple plural allomorphs and you want to see all cases where the PL morpheme is pronounced as \[a\], you would search for the string “PL” in the Gloss track, and the string “a” in the IPA track at the same time. Users can search as many tracks simultaneously as they’d like, but hits will only include those sentences which contain ALL of the searched strings or which match ALL of the regular expressions searched for (Figure 20).

Figure 20\. Search Multiple tracks.
![](images/image7.png)

### 5.4 Context button {#5.4-context-button}

Next to each sentence that is a match for a given search, there is a “Context” button (cf. Figure 18). Clicking this button takes the user to the location of that sentence within its passage. The relevant sentence will appear at the top of the page (unless it appears within the last nine sentences of a passage, in which case it may not be at the top), and a user can view the larger context in which that sentence was spoken.

### 5.5 Find and replace {#5.5-find-and-replace}

Within the Word Search tab, when a particular search string or regular expression is matched, users can choose to replace that a string in the matching sentences with another string using the boxes at the top of the screen, where it says “In words in this track, replace \_\_\_\_ with \_\_\_\_”. The blanks can be filled in with any string of characters by the user (Figure 21). Note that this change will override what has previously been entered in the corresponding sentences. Upon entering strings into the blanks and clicking “Replace”, the user will be prompted to confirm this change (Figure 22). If the change is made in a large number of sentences, it may take a few minutes for the site to load while processing the change.

Users are cautioned to use the “find and replace” tool with care, because once the replacement has been finalized, the user no longer has access to the previous forms.

Figure 21\. Find and Replace, step 1\.  
![](images/image13.png)

Figure 22\. Find and Replace, step 2\.  
![](images/image20.png)

### 5.6 Exporting searched sentences {#5.6-exporting-searched-sentences}

To export the results of a search, one can “select” individual sentences using the check box on the right of each sentence, or can select “Select All” at the top right of the page, then click “Export” under the “Select All button” and proceed as directed in section 4.6.

## 6 Dictionary {#6-dictionary}

Upon clicking on the “Dictionary” tab, users will see an alphabetized list of all distinct words in the dictionary. Words are defined as all characters entered into a single blank/tab in any TIPA2 or Text type track in the Passages tab. Any character difference among two words will result in two distinct dictionary entries. To view each morpheme, rather than each word, separately, click on the blue “Switch to Morpheme” button at the top of the page (Figure 23). Morphemes are defined as words, or parts of words separated by a dash or equals sign. Assuming that there are the same number of dashes on the IPA and Gloss line, glosses will correctly align with transcriptions of each morpheme in the dictionary. When the number of morphemes does ***not*** align on the IPA and glossing tier, these forms will be highlighted in red in the Dictionary tab. This can be a useful tool for identifying errors in data entry.

Next to each dictionary entry is a button listing the number of occurrences of that distinct word in the Passages in the given Project. Clicking on the number of occurrences leads to a list of all sentences containing that word or morpheme. These sentences can be viewed in the context of their larger passage by clicking on “Context” next to a given sentence, just as in the Word Search tab (section 5.4).

Figure 23\. Dictionary search function.
![](images/image17.png)

The full dictionary can be downloaded by clicking “Export to CSV” on the Dictionary page (Figure 23).

## 7 Permissions {#7-permissions}

Each project is only accessible by the creator and individuals who have been given access by the creator. The creator can grant access to a project by clicking the “Share” button on the top right of the screen within the relevant project (Figure 24). Choose the type of access (“reader” or “writer) desired from the drop down menu, and enter the email address of the person who is being granted access (Figure 25). Make sure there is no space before or after the email address entered. Click “Submit”, and that person should now be able to login with their email account and view the project.

Figure 24\. Sharing a project.
![](images/image23.png)

Figure 25\. Add Reader.  
![](images/image21.png)

### 7.1 Writers {#7.1-writers}

Writers are people who have edit permissions on the project. Almost all functions that are available to the creator of the project are available to writers.

### 7.2 Readers {#7.2-readers}

Readers are people who can view but not edit a project. Readers can view and export data as writers can, but cannot add new data.

## 8 Questions? {#8-questions?}

If you have questions about the site, or if something is not working as it should, please email [twisted-tongues-team@googlegroups.com](mailto:twisted-tongues-team@googlegroups.com).
