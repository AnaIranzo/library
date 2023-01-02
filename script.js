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
    event.preventDefault()
    console.log(event);
    let selected =  event.target.value;
    console.log(selected);
    list =  selected;
    const urlType = `https://api.nytimes.com/svc/books/v3/lists/current/${list}.json?api-key=YaX4wGwjQYBAP1KnRbq7VSTeTbypkxM5`
    fetcListType(urlType)
    document.querySelector('#dashboard').style.display = 'none'
    document.querySelector('#list').style.display = 'block'

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
        document.querySelector('#dashboard').innerHTML += ` <div>
        <h3>${data[i].list_name}</h3>
        <p>${data[i].oldest_published_date}</p>
        <p>${data[i].newest_published_date}</p>
        <p>${data[i].updated}</p>
        
        <input type="submit" value="${data[i].list_name_encoded}" onclick="setList(event)">
    </div>`// enlace
        
    }
}


async function printListType(data) {
    for (let i = 0; i < data.length; i++) {
        document.querySelector('#list').innerHTML += `<div>
        <img src="${data[i].book_image}" alt="">
        <p>${data[i].weeks_on_list}</p>
        <p>${data[i].description}</p>
        <h3>#${data[i].rank} ${data[i].title}</h3>
        <a href=""></a>
    </div>`
        
    }
}

async function backToIndex() {
    document.querySelector('#dashboard').style.display = 'block'
    document.querySelector('#list').style.display = 'none'
}