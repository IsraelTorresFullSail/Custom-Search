//================== Custom Search ==================//
let postList = [];
let post = document.querySelectorAll('.post-wrapper');
//console.log(post)
for (let i = 0; i < post.length; i++) {
  let image = post[i].firstChild.src;
  let title = post[i].text;
  let link = post[i].href;
  postList.push({image, title, link});
}
localStorage.setItem('postList', JSON.stringify(postList));

function searchAList(search) {
    return function (searchMe){
        return searchMe.title.toLowerCase().includes(search.toLowerCase()) || !search
    }  
};

let search = [];
document.getElementById('search').addEventListener('input', function(e) {
    search = e.target.value;
    //console.log(e.target.value);
    localStorage.setItem('search', JSON.stringify(search));
});
  
let returnList;
window.addEventListener('load', (event) => {
    returnList = JSON.parse(localStorage.getItem('postList'))
    //console.log(returnList)
});
  

document.getElementById('search').addEventListener('input', function() {
    const getSearch = JSON.parse(localStorage.getItem('search'));
    let myList = returnList.filter(searchAList(getSearch)).map(item => {
        return `<div class="item">
                    <img src="${item.image}" alt="post">
                    <a class="item-link" href="${item.link}">${item.title}</a>
                </div>`;
            
    });
    //console.log(myList)
    document.querySelector('.result-container').innerHTML = myList.join(' ');

    // Show or hide result-container if search input is empty
    if(document.getElementById('search').value == '') {
        document.querySelector('.result-container').style.display = 'none';
    } else {
        document.querySelector('.result-container').style.display = 'flex';
    }
});


