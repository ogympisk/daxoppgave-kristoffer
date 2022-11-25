import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc,
    query, where, getDocs, updateDoc
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyC7ufKvo8jHDQhOO8QojHGRYBxNJ-mT1gU",
    authDomain: "daxoppgave-88993.firebaseapp.com",
    projectId: "daxoppgave-88993",
    storageBucket: "daxoppgave-88993.appspot.com",
    messagingSenderId: "252441728216",
    appId: "1:252441728216:web:d4ea92d500ef17643f73ad"
};
//init firebase app
initializeApp(firebaseConfig)

//init services
const db = getFirestore()

// real time collection ref
const colRef = collection(db, 'login')

const itemCounter = collection(db, 'counter')


//queries
const login = document.querySelector(".login")
login.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault()
        const navn = login.username.value
        const passord = login.password.value
        const q = query(colRef, where("username", "==", navn))

        onSnapshot(q, (snapshot) => {
            let login = []
            snapshot.docs.forEach((doc) => {
                login.push({ ...doc.data(), id: doc.id })
            })
            const name = login[0].username
            const pass = login[0].passord


            if (pass === passord) {
                const reveal = document.querySelector(".hidden")
                reveal.classList.remove('hidden')
                const riktig = document.querySelector('.remove')
                riktig.remove()

                const velkommen = document.querySelector('.velkommen')
                velkommen.innerText += ` ${name}`

            } else {
                const div = document.querySelector('.feil')
                div.innerText += `Passord eller brukernavn er feil!`
            }
        })
    }
});
    let localCounter = 'X'
    
