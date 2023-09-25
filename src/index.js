document.addEventListener("DOMContentLoaded",  () =>{
    fetch("http://localhost:3000/movies")
    .then(res => res.json())
    // .then(res => console.log(res))
    .then(res => {
        updateMovieInfo(res["0"])
        globalMovies = res["0"]
        res.forEach(addMovieList)
        });
    })

    let globalMovies

    function addMovieList(movieData){
        let movieListDiv = document.createElement("div")
        let movieListImg = document.createElement("img")
        // let movieName = document.createElement("p")
        movieListImg.src = movieData.image
        // movieName.textContent = movieData.title
        movieListDiv.className = "movieDiv"
        movieListDiv.append(movieListImg/*, movieName*/)
        document.querySelector("#movie-list").append(movieListDiv)
        movieListImg.addEventListener('click', (e) => updateMovieInfo(movieData, e))

    }

    function updateMovieInfo(movieData){
        let movieInfoImg = document.querySelector("#detail-image")
        let movieInfoTitle = document.querySelector("#title")
        let movieInfoYear = document.querySelector("#year-released")
        let movieInfoDes = document.querySelector("#description")
        let movieInfoBlood = document.querySelector("#amount")
        let movieInfoWatched = document.querySelector("#watched")
        movieInfoImg.src = movieData.image
        movieInfoTitle.textContent = movieData.title
        movieInfoYear.textContent = movieData["release_year"]
        movieInfoDes.textContent = movieData.description
        movieInfoBlood.textContent = movieData["blood_amount"]
        if(movieData.watched === false){
            movieInfoWatched.textContent = "Unwatched"
        }
        else {
            movieInfoWatched = "Watched"
        }
        globalMovies = movieData
    }

    document.querySelector("#watched").addEventListener("click", handleWatch)


    function handleWatch(){
        movieInfoWatched = document.querySelector("#watched")
        if(movieInfoWatched.textContent === "Unwatched"){
            movieInfoWatched.textContent = "Watched"
            fetch(`http://localhost:3000/movies/${globalMovies.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    watched: true
                })
            })
            .then(res => res.json())
        }
        else{
            movieInfoWatched.textContent = "Unwatched"
            fetch(`http://localhost:3000/movies/${globalMovies.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    watched: false
                })
        })
    }
}

    document.querySelector("#blood-form").addEventListener("submit", handleBlood)

    function handleBlood(e){
        e.preventDefault()
        let bloodAmount = document.querySelector("#blood-amount")
        let movieInfoBlood = document.querySelector("#amount")
        movieInfoBlood.textContent = +bloodAmount.value + +movieInfoBlood.textContent
        document.querySelector("#blood-form").reset()
        fetch(`http://localhost:3000/movies/${globalMovies.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    blood_amount: +movieInfoBlood.textContent
                })
    })
}