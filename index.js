const apiKey='889429d92af74377957e4541da217d19';
const contentContainer=document.getElementById('content-container');
const searchBox=document.getElementById('searchBox');
const searchBtn=document.getElementById('searchBoxBtn');
searchBtn.addEventListener('click',async ()=>{
    const articles=searchBox.value.trim();
    if(articles !==''){
        try {
            const quries=await fetchNewsQuries(articles);
            displayContent(quries);
        } catch (error) {
            console.error('error in fetchRandomNews ',error);
        return []
        }
    }
})
async function fetchNewsQuries(quries){
    try{
        const apiUrl=`https://newsapi.org/v2/everything?q=${quries}&pageSize=10&apiKey=${apiKey}`;
        const response=await fetch(apiUrl);
        const data=await response.json();
        return data.articles;
        }catch(error){
            console.error('error in fetchRandomNews ',error);
            return []
        }
}
async function fetchRandomNews(){
    try{
    const apiUrl=`https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apiKey=${apiKey}`;
    const response=await fetch(apiUrl);
    const data=await response.json();
    return data.articles;
    }catch(error){
        console.error('error in fetchRandomNews ',error);
        return []
    }
}
function displayContent(articles){
    contentContainer.innerHTML='';
    articles.forEach((article) => {
        const cardContainer=document.createElement('div');
        cardContainer.classList.add('card-container');
        const img=document.createElement('img');
        img.classList.add('card-img');
        img.src=article.urlToImage || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAMFBMVEX19fXMzMzJycnx8fH4+PjZ2dnS0tLd3d3h4eHGxsbW1tbPz8/u7u7k5OTn5+fr6+tjq/wKAAACeklEQVR4nO3a23KCMBRA0ZCcQExA//9vS1CQayvw4NHu9dDpWGXYjZIgGAMAAAAAAAAAAAAAAAAAAAAAAAAAALbUTSwPi4179/6PXZM9Jd3k3Qk9qZMtTrGlmhqJJ1vamqglxlza3Um+OsinnPPuhgdxeWCCcQeZkIfG6RiaHJOK5vDOSJNSKpyoqOlH5jBdI3MZx8jw41V6Y1zjY6yue6ZBtTHXdGnfdNb6HTVKY6Sxtp8G65c3oDTGFcP0af3LG9AZI75Iw6T++npLaUyb8KwJnx3jJuutSlaO0CEujwwqY+TvmNAuKRcbUBljzGT1vFwTSJOP2+X8YZ0x4sc1t8Uzg81HO5vmD+uMqUcxfvke6+eg2TtNaYyE9Jw053sXnnPQ9CigNUauZZFP6gu/bHlOqG3N+M9qY6TuFpqNmZ+ehMmRblKjNOb+gFtZZE5bpjWqY1bMW1rPms+KkZWWtqbff/0x499XW1IRH0/SHzNaZoaNr9X6I7T6mNIOq5mtlnZs7isb5THOF8PaLNjNmGTL/BLdMS7mk7TU1YTLRko3NLZ7iuIYcY/1Zq5Z/eyPPjb5BZpjaj/850P1e0sbI6pj3OiaQNqs+IwYt+v6hvIY/9f+f0yMmLirRXOMMXuvByqO2X89UG/M/ULN18TsbVEd81UjQ8z3xDitMe1pzG6iNkb2yxvQGnNoA7piupsaTtyhoS6mOnrrjKsrRTFGckyKR5XdYU1Ji5Eqf2iO3weYX1xpiTGuPHsnYNTyLstXzMpTt2jmL9F13KFl8umyu1X7J8xedXPdHPXujLtu9ju5L2piAAAAAAAAAAAAAAAAAAAAAAAAAOD/+gEKuR+t0/LxHAAAAABJRU5ErkJggg==";
        img.alt='article tittle';
        const cardTittle=document.createElement('h2');
        cardTittle.classList.add('card-tittle');
        cardTittle.innerText=article.title.length >30? article.title.slice(0,30) +"...": article.title;
        const cardContent=document.createElement('p')
        cardContent.classList.add('card-content');
        cardContent.innerText=article.description.length >120?article.description.slice(0,120) + '...' :article.description;
        cardContainer.addEventListener('click',()=>{
            window.open(article.url , "_blank");
        })
        cardContainer.appendChild(img);
        cardContainer.appendChild(cardTittle);
        cardContainer.appendChild(cardContent);
        contentContainer.appendChild(cardContainer);
    });
}
(async ()=>{
    try{
        const articles=await fetchRandomNews();
        displayContent(articles);
    }catch(error){
        console.error('error in fetchRandomNews ',error);
        return []
    }
})();