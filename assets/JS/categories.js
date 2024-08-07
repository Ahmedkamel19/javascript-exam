function displayChosenMeal(mealData){
    let data=mealData.meals[0]
        $(".row").append('<div class="col-lg-4">')
        $(".row").append('<div class="col-md-8">')
        $(".row").find('.col-lg-4').append('<div class="meal-img "></div>')
        $(".meal-img").append(`<img src=${data.strMealThumb} class="w-100 rounded-2">`)
        $(".row").find('.col-lg-4').append(`<h1 class="text-white">${data.strMeal}</h1>`)
        $(".row").find('.col-md-8').append('<div class="info text-white">')
        $('.col-md-8').find('.info').append('<h2>Instructions</h2>')
        $('.col-md-8').find('.info').append(`<p>${data.strInstructions}</p>`)
        $('.col-md-8').find('.info').append(`<h3><span class="area fw-bolder">Area : </span>British</h3>`)
        $('.col-md-8').find('.info').append(`<h3><span class="category fw-bolder">Category : </span>British</h3>`)
        $('.col-md-8').find('.info').append('<ul class="ul-ing list-unstyled d-flex g-3 flex-wrap"></ul>')
        for(var i =1 ;i<=20;i++){
            let meal=data
            if(meal['strIngredient' + i] !==""){
                $('.col-md-8').find('.ul-ing').append(`<li class="alert alert-info m-2 p-1">${meal['strIngredient' + i]}</li>`)
            }}
        $('.col-md-8').find('.info').append('<h3>Tags :</h3>')
        $('.col-md-8').find('.info').append('<ul class="ul-tag list-unstyled d-flex g-3 flex-wrap"></ul>')
        $('.col-md-8').find('.info').append(`<a target="_blank" href=${data.strSource} class="btn btn-success mx-2">Source</a>`)
        $('.col-md-8').find('.info').append(`<a target="_blank" href=${data.strYoutube} class="btn btn-danger mx-2">Youtube</a>`)
        for(var i =0 ;i<=data.strTags.split(',').length;i++){
            let tags=data.strTags.split(',')
            if(tags[i]!=undefined){
                $('.col-md-8').find('.ul-tag').append(`<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`)
            }
        }
}

function displayCategory(category){
    category.categories.forEach(element => {
        $(".row").append(`<div class="col-lg-3 col-md-4 meal-${element.idCategory} position-relative" meal-name=${element.strCategory}>`)
        $(`.meal-${element.idCategory}`).append(`<div class="card bg-transparent">`)
        $(`.meal-${element.idCategory}`).find(".card").append(`<img src="${element.strCategoryThumb}" class="w-100" alt="">`)
        $(`.meal-${element.idCategory}`).find(".card").append('<div class="over-layer bg-white bg-opacity-75 text-center position-absolute top-0 bottom-0 overflow-hidden p-3 d-flex flex-column "></div>')
        $(`.meal-${element.idCategory}`).find(".over-layer").append(`<h2 class="fs-18">${element.strCategory}</h2>`)
        let words=element.strCategoryDescription
        words=words.split(" ")
        words=words.splice(0,20).join(' ')
        console.log(words)
        $(`.meal-${element.idCategory}`).find(".over-layer").append(`<p class="fs-18">${words}</p>`)
    });
}

function displayChossenCateg(mealName){
    mealName.forEach(element => {
        $(".row").append(`<div class="col-lg-3 col-md-4 meal-${element.idMeal} position-relative" idMeal=${element.idMeal}>`)
        $(`.meal-${element.idMeal}`).append(`<div class="card bg-transparent">`)
        $(`.meal-${element.idMeal}`).find(".card").append(`<img src="${element.strMealThumb}" class="w-100" alt="">`)
        $(`.meal-${element.idMeal}`).find(".card").append('<div class="over-layer bg-white bg-opacity-75 text-center position-absolute top-0 bottom-0 overflow-hidden p-3 d-flex flex-column justify-content-center align-items-center"></div>')
        $(`.meal-${element.idMeal}`).find(".over-layer").append(`<h2>${element.strMeal}</h2>`)
    });
}

async function selectedFoodCateg(mealName){
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`);
    let finalData= await data.json();
    displayChossenCateg(finalData.meals)
    mealId()
}

async function getIngrediantsById(id){
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let finalData= await data.json();
    displayChosenMeal(finalData)
}



function getMealName(){
    
    $(".col-lg-3").click(function (){
        $(".row").empty();
        let name=$(this).attr("meal-name")
        selectedFoodCateg(name)
    })
}


function mealId(){
    $(".col-lg-3").click(function (){
        $(".row").empty();
        let id=$(this).attr("idMeal")
        getIngrediantsById(id)
    })
}
async function foodCateg(){
    let data = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let finalData= await data.json();
    displayCategory
(finalData)
    getMealName()
}
$(window).on('load', function() {
    $('#preloader').fadeOut('slow', function() {
        $('#content').fadeIn('slow');
    });
});
foodCateg()

