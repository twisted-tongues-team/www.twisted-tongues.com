Why Twisted Tongues (TT)? 
-------------------------

TT provides a platform for data entry, management, search, and export. Unlike
offline alternatives, it is an online platform, editable and viewable by
multiple users simultaneously. It allows for flexibility in data structures
(the number of lines or tracks used in transcription/gloss/translation) and in
the alphabetic characters that can be entered, searched, and exported (all
(unicode) special characters are compatible). Upon entering data into passages,
all words and morphemes are automatically added to a dictionary or concordance,
available in the “Dictionary” tab and searchable in the “Word Search” tab via
string or regex search. There is easy export of as many tracks as desired, of
full passages or individual utterances or sentences. Export is available to
plain text, a table or csv, or LaTeX (assuming use of the tipa and gb4e
packages).

TT is not:
- A way to time-align transcription + audio files
- A way to annotate audio and video files. In fact, at the moment, there is no
  mechanism for uploading audio (though this will likely change).
- An automatic parser/glosser
- An archive (please archive your data in addition to using TT!)

Who has access to the data?
---------------------------

The data of a given project is only accessible by other users you have
explicitly added to the project (collaborators are added by e-mail).  Database
administrators will only access data during maintenance operations.

What technologies are used?
---------------------------
- Google Oauth is used for authentication. (Login with Google)
- Cookies are used to store authentication information (sessions for
  authentication)
- Language data is stored in an IBM Cloudant instance
- The webapp is running in AppEngine, an offering that is part of Google cloud
  platform.
- Periodic backups are taken and placed in Google cloud storage or Amazon web
  services S3.
- As features are added, additional Amazon Web Services (AWS) and Google Cloud
  platform (GCP) products may be used.
