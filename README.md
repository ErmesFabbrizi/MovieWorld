# 🎬 Movie World – La Tua App di Film Preferita! 🍿

Benvenuto in **Movie World**, una web app full-stack che ti consente di **cercare**, **scoprire**, **guardare trailer** e **salvare** i tuoi film preferiti. L’interfaccia è ispirata a Netflix, con autenticazione tramite Google e gestione della Watchlist persistente.

## 🚀 Demo

Guarda la demo video per vedere l'app in azione!  
👉 [Demo su LinkedIn] https://www.linkedin.com/posts/ermes-fabbrizi-435390314_react-mongodb-nodejs-activity-7325184219066896384-2UFB?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE_KP2kB2jOJXgfzXdX-6tl03Upq-UiOE2U


## 🧰 Tecnologie Utilizzate

### Frontend

- ⚛️ React.js
- 🎨 Bootstrap 5
- 🔁 React Router
- 📡 Axios
- 🎙 React Icons
- ✨ Custom CSS (stile tipo Netflix)
- 📍 LocalStorage (per la Watchlist)

### Backend

- ⚙️ Node.js
- 🖥 Express.js
- 🌐 MongoDB
- 🔐 JWT + Google OAuth 2.0

### API

- 🎬 [TMDb (The Movie Database)](https://www.themoviedb.org/documentation/api)

---

## ✨ Features

- 🔍 Ricerca film in tempo reale tramite TMDb
- 🎞 Guarda trailer ufficiali integrati da YouTube
- ⭐ Aggiungi/rimuovi film dalla tua Watchlist personale
- 👥 Visualizza dettagli completi e cast
- 👤 Login rapido e sicuro con Google
- 🌙 Interfaccia moderna in Dark Mode
- 💾 Dati utente e Watchlist salvati su MongoDB

---

## 📦 Come Clonare il Progetto

```bash
# Clona il repository
git clone https://github.com/tuo-username/movie-world.git

# Entra nella directory
cd movie-world

# Installa le dipendenze
npm install

# Avvia il server
npm start
```

L'app sarà disponibile su `http://localhost:3000`

---

## 🔑 Configurazione API

Per usare TMDb, è necessaria una chiave API:

1. Registrati su [TMDb](https://www.themoviedb.org/)
2. Ottieni una API Key
3. Sostituisci il valore di `tmdbApiKey` in `App.js`

> ⚠️ In fase di testing, una chiave demo è già inclusa (`f245ddf2fa039b4ac103b86de1fc2df4`)

---

## 🔐 Login con Google

- OAuth 2.0 tramite `@react-oauth/google`
- One Tap Login abilitato
- Profilo utente gestito lato client + MongoDB

---

## 🤝 Contribuire

Vuoi contribuire? Sei il benvenuto!

1. Fai un fork del progetto
2. Crea un nuovo branch (`git checkout -b feature/NuovaFeature`)
3. Fai le modifiche e il commit (`git commit -m 'Aggiunta nuova feature'`)
4. Fai push al branch (`git push origin feature/NuovaFeature`)
5. Apri una Pull Request

---

## 📄 Licenza

Distribuito sotto licenza **MIT**. Vedi `LICENSE` per maggiori dettagli.

---

## 💎 Credits

- [TMDb](https://www.themoviedb.org/) – Database film
- [Google OAuth](https://developers.google.com/identity) – Autenticazione
- [React](https://react.dev/) – UI moderna
- [MongoDB](https://www.mongodb.com/) – Persistenza dati
- [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/) – Backend e API

---

## 📬 Contatti

Hai domande o proposte?  
Contattami su [LinkedIn](www.linkedin.com/in/ermes-fabbrizi-435390314) o apri una Issue nel repository!

---

🎥 **Grazie per aver visitato Movie World!** 👋
