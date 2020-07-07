window.addEventListener('DOMContentLoaded', (event) => {
    console.log("dom successfully loaded")

    let start = 0
    let end = 10
    let current_page = 1
    
    let body = document.querySelector('body')
    
    pageTitle = () => {
        let titleDiv = document.createElement('div')
        titleDiv.className = 'title-div'
        let title = document.createElement('p')
        title.className = 'title'
        title.innerText = 'Release the (Grey)hounds!'
        body.appendChild(titleDiv)
        titleDiv.appendChild(title)
    }
    pageTitle()

    pageDesc = () => {
        let desc = document.createElement('h4')
        desc.className = 'desc'
        desc.innerText = 'Welcome to the Italian Greyhound love fest. Show us your hounds.'
        body.appendChild(desc)
    }
    pageDesc()
    
    let pageDiv = document.createElement('div')
    pageDiv.className = 'page-div'
    body.appendChild(pageDiv)
    
    createPetCard = (url, dogDiv) => {
        let petImg = document.createElement('img')
        petImg.src = url 
        petImg.className = "pet-card"
        dogDiv.appendChild(petImg) 
    }
    
    fetchPets = (start, end) => {
        fetch(`https://dog.ceo/api/breed/greyhound/italian/images`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data.message)
            let dogDiv = document.createElement('div')
            dogDiv.className = 'dog-div'
            pageDiv.appendChild(dogDiv)
            data.message.slice(start, end).map( url => createPetCard(url, dogDiv))  
        })
    }
    fetchPets(start, end)

    let pageRendered = document.createElement('div')
    pageRenderedDisplay = (current_page) => {
        pageRendered.className = 'page-number'
        pageRendered.innerText = `Page ${current_page}`
        body.appendChild(pageRendered)
    }
    pageRenderedDisplay(current_page)

    paginateForward = () => {
        backwardBtn.disabled = false
        current_page = current_page + 1
        start = start + 10
        end = end + 10
        pageDiv.innerHTML = ''
        // body.removeChild(p)
        
        fetchPets(start, end)
        pageRenderedDisplay(current_page)
    }

    paginateBackward = () => {
        if (current_page > 1) {
            backwardBtn.disabled = false
            current_page = current_page - 1
            start = start - 10
            end = end - 10
            pageDiv.innerHTML = ''
            // body.removeChild(pageButton)
            
            fetchPets(start, end)
            pageRenderedDisplay(current_page)
        } else {
            backwardBtn.disabled = true
        }
    }

    let backwardBtn = document.createElement('button')
    createBackwardBtn = () => {
        let buttonDiv = document.createElement('span')
        buttonDiv.className ='nav-btn'
        backwardBtn.className = "backward-btn"
        backwardBtn.innerText = 'previous page'
        backwardBtn.disabled = true
        body.appendChild(buttonDiv) 
        buttonDiv.appendChild(backwardBtn)
    }
    createBackwardBtn()
    
    let forwardBtn = document.createElement('button')
    createForwardBtn = () => {
        forwardBtn.className = "forward-btn"
        forwardBtn.innerText = 'next page'
        body.appendChild(forwardBtn)
    }
    createForwardBtn()

    const dialog = document.createElement('dialog');
    openModal = (photo) => {
        dialog.innerHTML = `
            <button class='exit' >x</button>
            <img src=${photo} />
        `
        // fix this ^^

        document.body.appendChild(dialog);

        dialog.showModal();
    }

    closeModal = () => {
        dialog.close()
    }
  
    body.addEventListener('click', (event) => {
        if(event.target.className === 'pet-card') {
            console.log(event.target.src)
            let photo = event.target.src
            openModal(photo)
        }
        if(event.target.className === 'forward-btn') {
            paginateForward()

        }
        if(event.target.className === 'backward-btn') {
            paginateBackward()
        }
        if(event.target.className === 'exit') {
            closeModal()
        }
    })
})
    
    
    
// data sets instead of directly putting in class names
// previous page button still wonky
