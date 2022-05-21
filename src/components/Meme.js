import React from "react";
// import memeData from "../data/memeData";
// import data from "../data/memeData";

export default function Meme(){

    let [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/30b1gx.jpg" 
    })
    let [allMemeImages, setAllMemeImages] = React.useState({})

    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then((res) => res.json())
        .then((res) => setAllMemeImages(res))
    },[])

    function selectRandomImage(){
        if(allMemeImages.success === true){
            let arrayMeme = allMemeImages.data.memes;
            let randomIdx = Math.floor(Math.random() * arrayMeme.length);
            setMeme((prevState)=>{
                return {
                    ...prevState,
                    randomImage: arrayMeme[randomIdx].url
                }
            });
        }
    }

    function handleChange(event){
        let {name,value} = event.target;
        console.log("handleChange")
        setMeme((prevState)=>{
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    return (
        <div>
            <div className="form">
                <input type="text" name="topText" className="form-input" placeholder="Enter your text" value={meme.topText} onChange={handleChange} />
                <input type="text" name="bottomText" className="form-input" placeholder="Enter your text" value={meme.bottomText} onChange={handleChange} />
                <button className="form-button" onClick={()=> selectRandomImage()}>Get a New Meme Image</button>

                <div className="meme">
                    <img src={meme.randomImage} className="meme--image" />
                    <h2 className="meme--text top">{meme.topText}</h2>
                    <h2 className="meme--text bottom">{meme.bottomText}</h2>
                </div>


            </div>
            
        </div>
    );
}