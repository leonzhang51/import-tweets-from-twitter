import React, { useState,useEffect,Fragment } from 'react';
const axios = require('axios');

const token = "AAAAAAAAAAAAAAAAAAAAABtXMQEAAAAAc5Hk4gYURFATxKMAK6f%2FxXBpNQY%3D7luZ2jU3JLm8IRbDcld6eMkvwTIkxK5s9y6Wza9byhOGU08wd9"; 
function GetTweets(){
    const [tweets,setTweets] = useState();
    
    const [query,setQuery]=useState('US');
    
 //read data from twitter by API
    useEffect(() => {



        const fetchData = async() =>{
            const result = await  axios({
                method:'get',
                responseType: 'json',
                url:`https://api.twitter.com/2/tweets/search/recent?query=${query}&max_results=10&tweet.fields=created_at,lang,conversation_id`,
                headers:{
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin':'https://api.twitter.com',
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                  "authorization": `Bearer ${token}`
                }
                
              });
              if(result.status ===200) setTweets(result.data.data)
              console.log(result);
              console.log(query);
        }
        fetchData();
        
    }, [query]); //user second parameter to avoid infinite invoke axios (infinite invoke reason is update state will cause render axios)
    if (tweets)return(
        <Fragment>
           <button onClick={()=>setQuery('Donald+Trump')}>Donald Trump</button>
            <button onClick={()=>setQuery('Clinton+Hillary')}>Clinton Hillary</button>
            {tweets.map((tweet) => <div key={tweet.id}>
                <h2>{tweet.conversation_id}</h2>
                <h3>{tweet.created_at}</h3>
                <h4>{tweet.lang}</h4>
                <p>{tweet.text}</p>
            </div>)}
        </Fragment>
        
        
    );

    return (
        <Fragment>
            <button onClick={()=>setQuery('Donald+Trump')}>Donald Trump</button>
            <button onClick={()=>setQuery('Clinton+Hillary')}>Clinton Hillary</button>
        </Fragment>
   
    );
}
export default GetTweets;