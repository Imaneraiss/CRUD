let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit =document.getElementById('submit');
let update = document.getElementById('update');
let mood ='create';
let tempo;
let searchByCategory = document.getElementById('searchByCategory');
let searchByTitle = document.getElementById('searchByTitle');
let search = document.getElementById('search');


// get total 
function getTotal () {
    if (price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value - +discount.value);
        total.innerHTML = result;
        total.style.background='#040';
    }else {
        total.innerHTML = '';
        total.style.background=' rgba(207, 1, 1, 0.596)';
    }
}

let dataPro;
if (localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}

// create product 
submit.addEventListener('click',function(){

    if(title.value != '' && total.innerHTML != '' && category.value !='' ){
        let newPro= {
            title:title.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value ,
            total: total.innerHTML,
            count:count.value ,
            category:category.value.toLowerCase(),
        }
        if (mood =='create'){
            if (newPro.count >1){
                for(let i= 0; i<newPro.count ;i++){
                    dataPro.push(newPro);
                }
            }else {
                dataPro.push(newPro);
            }
        }else{
            dataPro[tempo] = newPro;
            mood = 'create';
            submit.innerHTML ='Create';
            count.style.display ='block';
            console.log('good');
        }
        localStorage.setItem('product',JSON.stringify(dataPro));
        console.log(dataPro);
        clearData()
        showData()
    }else{
        window.alert('Remplir tous les champs requis!');
    }
})




// clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    total.style.background=' rgba(207, 1, 1, 0.596)';
}


//read 
function showData(){

    let tbody ='';
    for (let i = 0; i< dataPro.length ;i++){
        tbody +=`
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            
            </tr>
        `;
    }
    console.log('done');
    document.getElementById('tbody').innerHTML = tbody;

    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length >0){
        btnDelete.innerHTML= `<button onclick="deleteAll()" >Delete All</button>`;
    }else{
        btnDelete.innerHTML= ``;

    }
}
window.onload = function(){
    showData();
}


//delete


function deleteData(i){
    dataPro.splice(i,1); // delete from i 1 elem 
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}


// update
function updateData(i){
    mood = 'update';
    title.value = dataPro[i].title;
    price.value =dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    count.style.display = 'none'
    total.innerHTML =dataPro[i].total;
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    tempo =i;
    scroll({
        top:0 ,
        behavior : "smooth"
    })
}


//search 
let searchMood = 'title'
function getSearchMood(type){
    if(type == 'searchByTitle'){
        searchMood ='title';
    }else{
        searchMood ='category';
    }
    search.placeholder ='Search By '+searchMood;
search.focus();  
search.value ='';
showData();
}
function searchData(value){
    let tbody ='';
    for (let i=0;i<dataPro.length;i++){
        if (searchMood == 'title'){
                if (dataPro[i].title.includes(value.toLowerCase())){
                    tbody +=`
                        <tr>
                            <td>${i+1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">update</button></td>
                            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                        
                        </tr>
                    `;
                }
        }else{
                if (dataPro[i].category.includes(value.toLowerCase())){
                    tbody +=`
                        <tr>
                            <td>${i+1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">update</button></td>
                            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                        
                        </tr>
                    `;
                }
        }
    }
    document.getElementById('tbody').innerHTML = tbody;


}


// clean data