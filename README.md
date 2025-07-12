# CGR - Landing Page

Sito web dedicato alla CGR (Comunità Giovanile Roviano), pensato come landing page informativa per promuovere eventi, festival, iniziative culturali e musicali del territorio. Il sito offre una panoramica sulla storia del CGR, la timeline degli eventi, la presentazione dei progetti, la gallery fotografica, informazioni su come raggiungere la location e dettagli sui partner e sponsor. (Powered by Rovi - Spazio Creativo ETS)

Il design è moderno, responsivo e orientato alla valorizzazione delle attività giovanili e artistiche locali.

Repository per la landing page CGR. Segui questi passaggi per iniziare:

## Prerequisiti
- [Git](https://git-scm.com/downloads)
- [Visual Studio Code](https://code.visualstudio.com/download)
- Estensione Git per VS Code
- Account GitHub

## Clonazione
```bash
git clone https://github.com/lucarosati28/cgr.git
```

<<<<<<< HEAD
## Collegamento a un nuovo repository GitHub
1. Crea un nuovo repository vuoto su GitHub (senza README, .gitignore, licenza)
2. Rimuovi il remote origin:
=======
1. Apri il terminale sul tuo computer
2. Naviga nella directory dove vuoi clonare il repository
3. Esegui il comando:
   ```bash
   git clone https://github.com/CGRoviano/cgr.git
   ```
4. Attendi che il clone sia completato

## Configurazione del tuo nuovo repository

Dopo aver clonato il repository, segui questi passaggi per collegarlo al tuo spazio GitHub:

1. Crea un nuovo repository vuoto su GitHub
   - Vai su GitHub.com e accedi al tuo account
   - Clicca sul pulsante "+" in alto a destra e seleziona "New repository"
   - Dai un nome al repository
   - NON inizializzare il repository con README, .gitignore o licenza
   - Clicca "Create repository"

2. Rimuovi il remote origin esistente
>>>>>>> 29cb47474aa5905027a3cfe2086ebd32490cbe09
   ```bash
   git remote remove origin
   ```
3. Aggiungi il tuo nuovo remote:
   ```bash
   git remote add origin https://github.com/TUO-USERNAME/NOME-REPOSITORY.git
   ```
4. Carica il codice:
   ```bash
   git branch -M main
   git push -u origin main
   ```

## Configurazione Git
Configura le tue credenziali (solo la prima volta):
```bash
git config --global user.name "Il tuo nome"
git config --global user.email "tua.email@example.com"
```

## Utilizzo in VS Code
1. Apri la cartella del repository in VS Code
2. Il Source Control rileva automaticamente le modifiche
3. Per fare commit:
   - Stagia i file modificati (+)
   - Scrivi un messaggio
   - Conferma (✓ o Ctrl+Enter)
4. Per pubblicare:
   ```bash
   git push
   ```

## Gestione Branch
- Crea/cambia branch dalla barra in basso di VS Code

## Verifica
- Visualizza i remote:
  ```bash
  git remote -v
  ```
- Stato repository:
  ```bash
  git status
  ```

## Problemi comuni
- Windows: usa Credential Manager
- macOS: usa Keychain Access
- Linux: git-credential-store

Per assistenza: [Git Docs](https://git-scm.com/doc) | [VS Code Docs](https://code.visualstudio.com/docs/editor/versioncontrol)
