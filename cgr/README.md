# CGR Repository

## Prerequisiti

Prima di iniziare, assicurati di avere installato:

- [Git](https://git-scm.com/downloads)
- [Visual Studio Code](https://code.visualstudio.com/download)
- L'estensione Git per Visual Studio Code
- Un account GitHub

## Come clonare il repository

1. Apri il terminale sul tuo computer
2. Naviga nella directory dove vuoi clonare il repository
3. Esegui il comando:
   ```bash
   git clone https://github.com/lucarosati28/cgr.git
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
   ```bash
   git remote remove origin
   ```

3. Aggiungi il tuo nuovo repository come remote
   ```bash
   git remote add origin https://github.com/TUO-USERNAME/NOME-REPOSITORY.git
   ```

4. Carica il codice sul tuo repository
   ```bash
   git branch -M main
   git push -u origin main
   ```

## Configurazione in Visual Studio Code

1. Apri Visual Studio Code
2. Vai su File > Open Folder (o Apri Cartella) e seleziona la cartella del repository
3. Alla prima apertura, VS Code dovrebbe riconoscere automaticamente il repository Git

## Configurazione Git (solo la prima volta)

Se non l'hai già fatto, configura Git con le tue credenziali:

```bash
git config --global user.name "Il tuo nome"
git config --global user.email "tua.email@example.com"
```

## Come fare commit delle modifiche

1. Dopo aver fatto delle modifiche ai file, apri il Source Control panel in VS Code (icona con i tre cerchi collegati o premi Ctrl+Shift+G)
2. Vedrai la lista dei file modificati
3. Fai hover su un file e clicca sul + per "stage" delle modifiche
4. Scrivi un messaggio di commit che descriva le modifiche apportate
5. Premi Ctrl+Enter o clicca sul segno di spunta ✓ per fare il commit

## Come pubblicare i commit su GitHub

Per inviare i tuoi commit al repository remoto:

1. Clicca sull'icona "Sync Changes" (↻) nella barra in basso o usa il comando
   ```bash
   git push
   ```
2. Se richiesto, inserisci le tue credenziali GitHub

## Branch management

Per creare un nuovo branch:

1. Clicca sul nome del branch corrente nella barra in basso
2. Seleziona "Create new branch..."
3. Inserisci il nome del nuovo branch

Per cambiare branch:
1. Clicca sul nome del branch corrente nella barra in basso
2. Seleziona il branch desiderato dalla lista

## Verifica della configurazione

Per verificare che tutto sia configurato correttamente:

1. Controlla i repository remoti configurati:
   ```bash
   git remote -v
   ```
   Dovresti vedere il tuo nuovo repository URL come origin

2. Verifica lo stato del repository:
   ```bash
   git status
   ```

## Problemi comuni

Se incontri problemi con le credenziali:
1. Su Windows, usa Credential Manager
2. Su macOS, usa Keychain Access
3. Su Linux, configura git-credential-store

Per ulteriore assistenza, consulta la [documentazione di Git](https://git-scm.com/doc) o la [documentazione di VS Code](https://code.visualstudio.com/docs/editor/versioncontrol).
