$(document).ready(function(){
    var ingredients = ["light rum","applejack","gin","dark rum","sweet vermouth","strawberry schnapps","scotch","apricot brandy","triple sec","southern comfort","orange bitters","brandy","lemon vodka","blended whiskey","dry vermouth","amaretto","tea","champagne","coffee liqueur","bourbon","tequila","vodka","añejo rum","bitters","sugar","kahlua","demerara sugar","dubonnet rouge","lime juice","irish whiskey","apple brandy","carbonated water","cherry brandy","creme de cacao","grenadine","port","coffee brandy","red wine","rum","grapefruit juice","ricard","sherry","cognac","sloe gin","apple juice","pineapple juice","lemon juice","sugar syrup","milk","strawberries","chocolate syrup","yoghurt","mango","ginger","lime","cantaloupe","berries","grapes","kiwi","tomato juice","cocoa powder","chocolate","heavy cream","galliano","peach vodka","ouzo","coffee","spiced rum","water","espresso","angelica root","orange","cranberries","johnnie walker","apple cider","everclear","cranberry juice","egg yolk","egg","grape juice","peach nectar","lemon","firewater","lemonade","lager","whiskey","absolut citron","pisco","irish cream","ale","chocolate liqueur","midori melon liqueur","sambuca","cider","sprite","7-up","blackberry brandy","peppermint schnapps","creme de cassis","jack daniels","bailey's irish cream","151 proof rum","absolut vodka","goldschlager","crown royal","cointreau","vermouth","advocaat","absolut kurant","beer","kool-aid","cherry heering","white creme de menthe","malibu rum","vanilla vodka","jägermeister","kiwi liqueur","grand marnier","cachaca","peachtree schnapps","wild turkey","cranberry vodka","corona","orange juice","yukon jack","chocolate ice-cream","coconut rum","banana liqueur","black sambuca","hot damn","mint","campari","ice","sour mix","absinthe","whisky","guinness stout","vanilla ice-cream","chambord raspberry liqueur","jim beam","godiva liqueur","fruit punch","baileys irish cream","zima","blue curacao","coca-cola","maui","frangelico","bacardi limon","raspberry vodka","green creme de menthe","lemon peel","prosecco","white rum","mezcal","green chartreuse","grape soda","hot chocolate","blended scotch","rye whiskey"];
    var glass = ["highball glass","cocktail glass","old-fashioned glass","collins glass","pousse cafe glass","champagne flute","whiskey sour glass","brandy snifter","white wine glass","nick and nora glass","hurricane glass","coffee mug","shot glass","jar","irish coffee cup","punch bowl","pitcher","pint glass","copper mug","wine glass","cordial glass","beer mug","margarita/coupette glass","beer pilsner","beer glass","parfait glass","mason jar","margarita glass","martini glass","balloon glass","coupe glass"];
    var categories = ["Ordinary Drink","Cocktail ","Milk / Float / Shake","Other/Unknown","Cocoa","Shot","Coffee / Tea","Homemade Liqueur","Punch / Party Drink","Beer","Soft Drink / Soda"];

    //Default searches when page loads
    $("#category_filter").show();
    $("#alc_content_filter").hide();
    $("#glass_filter").hide();
    $("#ing_filter").hide();
    filterByCategory($("#category_filter_select").val());

    $("#drink_search_input").keypress(function(e){
        if(e.which ==13){
            var search_term = $("#drink_search_input").val();
            searchByName(search_term);
        }
    });
    $("#alc_content_filter_select").on("click", function(){
        filterByAlcoholic($("#alc_content_filter_select").val())
    });
    $("#alc_content_filter_select").on("change", function(){
        filterByAlcoholic($("#alc_content_filter_select").val())
    });
    $("#category_filter_select").on("click", function(){
        filterByCategory($("#category_filter_select").val());
    });
    $("#category_filter_select").on("change", function(){
        filterByCategory($("#category_filter_select").val());
    });
    $("#random_drink_button").on("click", searchRandomDrink);
    $("#select_filter").on("change",function(){
        var filter = $("#select_filter").val();
        if (filter == "category_filter"){
            $("#category_filter").show();
            $("#alc_content_filter").hide();
            $("#glass_filter").hide();
            $("#ing_filter").hide();
            filterByCategory("Ordinary Drink");
        }else  if (filter == "alc_content_filter"){
            $("#category_filter").hide();
            $("#alc_content_filter").show();
            $("#glass_filter").hide();
            $("#ing_filter").hide();

        }else  if (filter == "glass_filter"){
            $("#category_filter").hide();
            $("#alc_content_filter").hide();
            $("#glass_filter").show();
            $("#ing_filter").hide();

        }else  if (filter == "ing_filter"){
            $("#category_filter").hide();
            $("#alc_content_filter").hide();
            $("#glass_filter").hide();
            $("#ing_filter").show();
        }

    });
    $(".display").on("mouseenter",".shortDrink", function(){
        console.log("in!");
        $(".shortDrink").click(function(){
            console.log("clicked!");
            var id = $(this).attr("id");
            searchByID(id);
        });
    });
    //SOURCE: https://stackoverflow.com/questions/35554108/javascript-html5-array-search-and-return-from-html5-text-box-if-in-array
    $("#ing_filter_input").on("keyup", function(e){
        if(e.which == 13){
            filterByIngredient($("#ing_filter_input").val());
            $(".search_suggestions").empty();
            $("#ing_filter_input").val("");
        }else{
            var results = searchInput("#ing_filter_input", ingredients);
            display_searchInput(results);
        }
    });
    $("#glass_filter_input").on("keyup", function(e){
        if(e.which == 13){
            filterByGlass($("#glass_filter_input").val());
            $(".search_suggestions").empty();
            $("#glass_filter_input").val("");
        }else{
            var results = searchInput("#glass_filter_input", glass);
            display_searchInput(results);
        }
    });
    //Searches for elements in the array with the given search string in it
    function searchInput(field, array){
        var searchFor = $(field).val().toLowerCase();
        var results = [];
        for(var i=0;i<array.length;i++){
            if(array[i].toLowerCase().indexOf(searchFor) > -1){
                if(searchFor != "" && searchFor != " ")
                    results.push(array[i])
                    }
        }
        return results;
    }
    //Takes an array of search results and displays it
    function display_searchInput(results){
        if(results.length == 0)
            $(".search_suggestions").html("No Results Found");
        else
            $(".search_suggestions").html( results.slice(0,8).join("<br>"));
    }
    //END SOURCE

    function searchByName(search_term){
        makeDrinkRequest("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + search_term, true);
    }
    //Look up drink ingredients
    //Returns an array of ingredients
    function searchByIngredient(search_term){
        makeDrinkRequest("https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + search_term, true);
        //TO-DO: Seperate display function for ingredients

    }
    //Search for drink by ID
    //Returns an array of drinks
    function searchByID(search_term){
        makeDrinkRequest("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + search_term, true);
    }
    //Searches for a random drink
    //Returns an array of drinks
    function searchRandomDrink(){
        makeDrinkRequest("https://www.thecocktaildb.com/api/json/v1/1/random.php", true);
    }
    //Filters results by ingredients
    function filterByIngredient(search_term){
        makeDrinkRequest("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + search_term, false);
    }
    //TO-DO: Checkbox for if non alcoholic 
    //If checkbox is true, filter by non_alcoholic
    //Returns an array of shortened drinks
    function filterByAlcoholic(alc_category){
        console.log("test");
        makeDrinkRequest("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=" + alc_category, false);
    }
    //Returns an array of shortened drinks
    function filterByCategory(category){
        //TO-DO: Add dropdown switch in form for all categories
        makeDrinkRequest("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c="+category, false);
    }
    function filterByGlass(search_term){
        makeDrinkRequest("https://www.thecocktaildb.com/api/json/v1/1/filter.php?g="+search_term, false);
    }
    //Debug method
    //Gets all possible categories from API
    function listAll(){
        printLists("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list","Category");
        printLists("https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list","Glass");
        printLists("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list","Ingredient1");
        printLists("https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list","Alcoholic");

    }
    function printLists(url, cat){
        var response;
        console.log("ran");
        var listToodles = new XMLHttpRequest();
        listToodles.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                console.log("Success");
                //console.log(JSON.parse(this.responseText));

                response = (JSON.parse(this.responseText)["drinks"]);
                for(var i = 0; i < response.length; i++){
                    console.log(response[i]["str"+cat]);
                }

                if(false){
                    //TO-DO: If response text is empty, display message that no terms were found
                }


            }else if (this.readyState == 4){
                console.log(this.responseText);
            }
        }
        listToodles.open("GET", url, true);
        listToodles.send();
    }

    function makeDrinkRequest(url, isFull){
        var response;
        console.log("ran");
        var listToodles = new XMLHttpRequest();
        listToodles.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                console.log("Success");
                console.log(JSON.parse(this.responseText));
                response = (JSON.parse(this.responseText))["drinks"];
                console.log(response);
                if(response == null){
                    //TO-DO: If response text is empty, display message that no terms were found
                }
                if(isFull)
                    displayFullCocktail(response);
                else
                    displayShortenedCocktail(response);


            }else if (this.readyState == 4){
                console.log(this.responseText);
            }
        }
        listToodles.open("GET", url, true);
        listToodles.send();
    }
    //Displays shortened info about a cocktail
    function displayShortenedCocktail(response){
        $(".display").empty();
        for(var i = 0; i < response.length; i++){
            var img = response[i]["strDrinkThumb"];
            var drink = response[i]["strDrink"];
            var drink_id = response[i]["idDrink"];
            $(".display").append("<div class='shortDrink' id='" + drink_id + "'><h2>" + drink + "</h2><img src='"+ img + "' / style='height: 100px;'> <br/><br/></div>");
        }
    }
    function displayFullCocktail(response){
        $(".display").empty();
        if(response == null){
            $(".display").append("No Results Found");
        }else{
            for(var i = 0; i < response.length; i++){
                var img = response[i]["strDrinkThumb"];
                var drink = response[i]["strDrink"];
                var instr = response[i]["strInstructions"];
                var drink_id = response[i]["idDrink"];
                var glass = response[i]["strGlass"];
                var alcho = response[i]["strAlcoholic"];
                var ing = [];
                for(var k = 1 ; k < 16; k++){
                    if(response[i]["strIngredient" + k.toString()] != ""){
                        console.log(response[i]["strIngredient" + k.toString()]);
                        ing.push(response[i]["strIngredient" + k.toString()]);
                        ing.push(response[i]["strMeasure" + k]);
                    }

                }
                $(".display").append("<div class='fullDrink' id='" + drink_id + "'></div>")
                $("#" + drink_id).append("<h3>" + drink + "</h3>");
                $("#" + drink_id).append("<img src='"+ img + "' />");
                $("#" + drink_id).append("<p>" + alcho + "</p>");
                $("#" + drink_id).append("<p>Glass: " + glass + "</p>");
                $("#" + drink_id).append("<p>Ingredients:</p> <ol>");
                for(var j = 0; j < ing.length; j+=2){
                    $("#" + drink_id).append("<li>" + ing[j+1] + " " + ing[j]) + "</li>";
                }
                $("#" + drink_id).append("</ol>");
                $("#" + drink_id).append("<p>Instructions:</p><p>" + instr + "</p>");
            }

            console.log(ing);
        }
    }
});