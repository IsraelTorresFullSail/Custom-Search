### Custom-Search Plugin for Webflow Blog Posts Collection

##### Steps

[`Initialize and array for the posts list and post list updated`]

```javascript
let postList = [];
let postListUpdated = [];
```

[`Assign a class .post-wrapper to the post list container`]

```javascript
let post = document.querySelectorAll('.post-wrapper');
```

[`Loop through the posts list and create variables for each property that you need to filter in your search and the values that you want to return.`]
[`Then, push each post object into the post list array`]

```javascript
for (let i = 0; i < post.length; i++) {
  let content = post[i].innerText;
  let link = post[i].children[3].href;
  let title = post[i].firstChild.innerText;
  postList.push({content, link, title});
}
```

[`Verify if there is an exiting posts list in the local storage`]

```javascript
let existingPostList = JSON.parse(localStorage.getItem('postList', JSON.stringify(postList)));
```

[`If there is an existing list, update that list`]

```javascript
if(existingPostList !== null) {
    postListUpdated = Object.values(existingPostList);
    for (let i = 0; i < postList.length; i++) {
    	if (!postListUpdated.find(o => o.content === postList[i].content && o.link === postList[i].link && o.title === postList[i].title)){
     		postListUpdated.push(postList[i])
     	}
    }
    localStorage.setItem('postList', JSON.stringify(postListUpdated));
}
```

[`If there is not an existing list, create a new list`]

```javascript
else {
    localStorage.setItem('postList', JSON.stringify(postList));
}
```

[`Create a function where you can pass a search parameter`]

```javascript
function searchAList(search) {
    return function (searchMe){
        return searchMe.content.toLowerCase().includes(search.toLowerCase()) || !search
    }  
};
```

[`Get the input key word and save it in the local storage and update it every time you type in the search bar`]

```javascript
let search = [];
document.getElementById('search').addEventListener('input', function(e) {
    search = e.target.value;
    localStorage.setItem('search', JSON.stringify(search));
});
```

[`Assign the return list to a variable when windown load`]

```javascript
let returnList;
window.addEventListener('load', (event) => {
    returnList = JSON.parse(localStorage.getItem('postList'))
});
```

[`Create a result container and show/hide it if search input is filled or empty`]

```javascript
document.getElementById('search').addEventListener('input', function() {
    const getSearch = JSON.parse(localStorage.getItem('search'));
    let myList = returnList.filter(searchAList(getSearch)).map(item => {
        return `<div class="item">
                    <a class="orange-link" href="${item.link}">${item.title}</a>
                </div>`;
            
    });
    document.querySelector('.result-container').innerHTML = myList.join(' ');

    if(document.getElementById('search').value == '') {
        document.querySelector('.result-container').style.display = 'none';
    } else {
        document.querySelector('.result-container').style.display = 'flex';
    }
});
```

###### Note:
> Style your search input and your result container as your convenience
