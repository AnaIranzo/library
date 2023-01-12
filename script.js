//APIKEY YaX4wGwjQYBAP1KnRbq7VSTeTbypkxM5
/* 
Al cargar la web deben de aparecer todas las listas con los siguientes datos:
1-Nombre completo de la lista
2-Fecha del libro más antiguo en la lista
3-Fecha del último libro incorporado
4-Frecuencia de actualización
5-Link para poder cargar la lista */

//https://api.nytimes.com/svc/books/v3/lists/names.json 1-4
//https://api.nytimes.com/svc/books/v3/lists.json 5? query list (required)



const urlLists = 'https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=YaX4wGwjQYBAP1KnRbq7VSTeTbypkxM5'


const fetcLists = async () => {
    try {
        
        const response = await fetch(urlLists).then(res => res.json()
        )
        console.log(response)
        printLists(response.results)
        
    } catch (error) {
        console.log("Error",error)
    }
}
fetcLists()


async function setList(event) {
    let list
    event.preventDefault();
    console.log(event);
    let selected =  event.target.value;
    console.log(selected);
    list =  selected;
    const urlType = `https://api.nytimes.com/svc/books/v3/lists/current/${list}.json?api-key=YaX4wGwjQYBAP1KnRbq7VSTeTbypkxM5`
    fetcListType(urlType)
    document.querySelector('#dashboard').style.display = 'none'
    document.querySelector('#list').style.display = 'flex'
    document.querySelector('#btn_back').style.display = 'block'

}


const fetcListType = async (urlType) => {
    try {
        const response = await fetch(urlType).then(res => res.json()
        )
        console.log(response)
        printListType(response.results.books)
        
        
    } catch (error) {
        console.log("Error",error)
    }
}

async function printLists(data) {
    
    for (let i = 0; i < data.length; i++) {
        document.querySelector('#dashboard').innerHTML += ` <div class="list_card">
        <h3>${data[i].list_name}</h3>
        <p>OLDEST: ${data[i].oldest_published_date}</p>
        <p>NEWEST: ${data[i].newest_published_date}</p>
        <p>UPDATED: ${data[i].updated}</p>
        <button value="${data[i].list_name_encoded}" onclick="setList(event)">READ MORE!</button>
    </div>`
        
    }
}


async function printListType(data) {
    
    for (let i = 0; i < data.length; i++) {
        let valueFav = [data[i].book_image, data[i].rank, data[i].title, data[i].weeks_on_list, data[i].description, data[i].amazon_product_url];
        
        //console.log(valueFav);
        document.querySelector('#list').innerHTML += `<div class="list_card books">
        <img src="${data[i].book_image}" alt="">
        <h3>#${data[i].rank} ${data[i].title}</h3>
        <p id="weeks"> Weeks on list: ${data[i].weeks_on_list}</p>
        <p id="desc">${data[i].description}</p>
        <a href="${data[i].amazon_product_url}">BUY AT AMAZON</a>
        <button class="add_fav" id="btn_fav" onclick="addFav(event)">Add to favorites</button>
        
    </div>`
    // <button class="add_fav${i}" onclick="addFav(${valueFav})">Add to favorites</button>
        //console.log(`#add_fav${i}`);
        
    }
    
    
   //
    
    
}
/* const btn = document.querySelectorAll('.add_fav');
    console.log(btn);
    btn.forEach(button => button.addEventListener('click', addFav(valueFav))); */

async function backToIndex() {
    document.querySelector('#dashboard').style.display = 'flex'
    document.querySelector('#list').style.display = 'none'
    document.querySelector('#list').innerHTML = `<div id="list"></div>`
    document.querySelector('#btn_back').style.display = 'none'
    
}

//Log links

const openS = document.getElementById('openS');
const openI = document.getElementById('openI');

const signForm = document.getElementById('sign-form');
const loginForm = document.getElementById('login-form');
const outForm = document.getElementById('out-form');

const closeS = document.getElementById('closeS');
const closeI = document.getElementById('closeI');


openS.addEventListener('click', (e) => {
    e.preventDefault();
    signForm.classList.add('show');  
});

openI.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('show');  
});

closeS.addEventListener('click', (e) => {
    e.preventDefault();
    signForm.classList.remove('show');
}); 

closeI.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.remove('show');
}); 

//FIREBASE

const firebaseConfig = {
    apiKey: "AIzaSyAl3mBzF1JrIegDkaZCM4ISAN2OvVCalT8",
    authDomain: "nyt-library-7b667.firebaseapp.com",
    projectId: "nyt-library-7b667",
    storageBucket: "nyt-library-7b667.appspot.com",
    messagingSenderId: "1061177010377",
    appId: "1:1061177010377:web:1cfbd338b94b65b19ac518"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();



//Sign In 
const signInForm = document.querySelector('#sign-form');

signInForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector("#sign-email").value;
    const password = document.querySelector("#sign-pass").value;

    auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            signInForm.reset();

            console.log('sign in');
        })
})

//Log In 

const logInForm = document.querySelector("#login-form");

logInForm.addEventListener("submit", (e)=> {
    e.preventDefault();

    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-pass").value;

    auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            signInForm.reset();

            console.log('log in');
        })
})

//Log Out
const logOut = document.querySelector("#log_out");

logOut.addEventListener("click", e => {
    e.preventDefault();
    auth
        .signOut()
        .then(() => {
            console.log('log out');
        })
})

auth.onAuthStateChanged(user => {
    if(user){
        console.log('auth: sign in');
    }else{
        console.log('log out');
    }
})

//Add favorites
/* let fav = {
        img,//data[i].book_image
        rank,// data[i].rank,
        title,// data[i].title,
        weeks,//data[i].weeks_on_list,
        descript, // data[i].description,
        amazon,//data[i].amazon_product_url,

} */

function addFav(event) {

    event.preventDefault();
    auth.onAuthStateChanged(user => {
        if(user){
        const btnfav = document.getElementById('btn_fav');
        btnfav.disabled = false;  

        if (event.target.classList.contains('add_fav')) {
        setFav(event.target.parentElement);
        console.log(event.target.parentElement);
        
        }
        event.stopPropagation();

        }else{
            
        
            alert('Log in to save your favorites')
            
            const btnfav = document.getElementById('btn_fav');
            btnfav.disabled = true; 

        }
    })

    
    //https://www.youtube.com/watch?v=JL7Wo-ASah4
    //console.log(event.target.value);
    
    /* let favorite = event.target.value
    favorite = favorite.split(",")
    console.log(favorite); */
    
}

function setFav(obj) {
    const book ={
            img: obj.querySelector("img").src,
            rank_title: obj.querySelector("h3").textContent,
            weeks: obj.querySelector("#weeks").textContent,
            desc: obj.querySelector("#desc").textContent,
            amazon: obj.querySelector("a").href,
        }
    
    auth.onAuthStateChanged(user => {
        if(user){
        

            console.log('auth: sign in');
            db.collection("users").add({
                user: user.email,
                book: book,
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        }else{
            alert('Log in to save your favorites')
        }
    })
    console.log(book);
    
}




async function showFav() {
    
    document.querySelector('#dashboard').style.display = 'none'
    document.querySelector('#list').style.display = 'none'
    document.querySelector('#btn_back').style.display = 'none'
    document.querySelector('#fav_list').style.display = 'flex'

    auth.onAuthStateChanged(user => {
        if(user){

            db.collection("users").where("user", "==", user.email)
                .get()
                .then((querySnapshot) => {querySnapshot.forEach((doc) => {
                    console.log(`${doc.id} => ${doc.data().book.amazon}`);
                    document.querySelector('#fav_list').innerHTML += `<div class="list_card books">
                    <img src="${doc.data().book.img}" alt="">
                    <h3>#${doc.data().book.rank_title}</h3>
                    <p id="weeks"> Weeks on list: ${doc.data().book.weeks}</p>
                    <p id="desc">${doc.data().book.desc}</p>
                    <a href="${doc.data().book.amazon}">BUY AT AMAZON</a>
                    </div>`
    });
});
        }
    })

}