window.addEventListener('DOMContentLoaded', (event) => {

    // Defining pagination variables in parent scope for later
    let start = 0
    let end = 10
    let current_page = 1
    
    // Defining body variable in parent scope for use throughout
    let body = document.querySelector('body')
    
    // Creating page title element 
    createPageTitle = () => {
        let title = document.createElement('p')
        title.className = 'title'
        title.innerText = 'Release the (Grey)hounds!'
        body.appendChild(title)
    }
    createPageTitle()

    // Creating page description element
    createPageDesc = () => {
        let desc = document.createElement('p')
        desc.className = 'text'
        desc.innerText = 'Welcome to the Italian Greyhound love fest. Show us your lil hounds.'
        body.appendChild(desc)
    }
    createPageDesc()
    
    // Creating a div that will act as a wrapper containing dog image div
    let pageDiv = document.createElement('div')
    createContainerDiv = () => {
        pageDiv.className = 'page-div'
        body.appendChild(pageDiv)
    }
    createContainerDiv()
    
    // Create individual dog thumbnail card
    createPetCard = (url, dogDiv) => {
        // Dog image wrapped in parent div for styling purposes
        let petCard = document.createElement('div')
        petCard.className = 'pet-card'
        dogDiv.appendChild(petCard) 

        let petImg = document.createElement('img')
        petImg.src = url 
        petImg.className = "pet-img"
        petCard.appendChild(petImg)
    }

    // Fetch data from the Italian Greyhound endpoint of Dog CEO API
    // https://dog.ceo/dog-api/
    fetchPets = (start, end) => {
        fetch(`https://dog.ceo/api/breed/greyhound/italian/images`)
        .then(resp => resp.json())
        .then(data => {
            // Creating a div that will hold all dog thumbnail cards
            // This div is the child of pageDiv wrapper
            let dogDiv = document.createElement('div')
            dogDiv.className = 'dog-div'
            pageDiv.appendChild(dogDiv)
            // Depending on current page, mapping over subsection of 
            // 10 results to create a thumbnail card of each result
            data.message.slice(start, end).map( url => createPetCard(url, dogDiv))  
        })
    }
    fetchPets(start, end)
    
    // Creating a div to hold page forward and page backwards buttons
    // Purely for styling purposes
    let buttonDiv = document.createElement('div')
    createNavBtnDiv = () => {
        buttonDiv.className ='nav-btn-div'
        body.appendChild(buttonDiv) 
    }
    createNavBtnDiv()
    
    // Create previous page button
    let backwardBtn = document.createElement('button')
    createBackwardBtn = () => {
        backwardBtn.className = "btn"
        // This button has an id for styling purposes
        backwardBtn.id = 'backwards-btn'
        backwardBtn.dataset.name = 'backward-btn'
        backwardBtn.innerText = 'Previous Page'
        // Button is disabled by default
        backwardBtn.disabled = true
        buttonDiv.appendChild(backwardBtn)
    }
    createBackwardBtn()
    
    // Create forward page button
    let forwardBtn = document.createElement('button')
    createForwardBtn = () => {
        forwardBtn.className = "btn"
        forwardBtn.dataset.name = 'forward-btn'
        forwardBtn.innerText = 'Next Page'
        buttonDiv.appendChild(forwardBtn)
    }
    createForwardBtn()

    // Create a little text element denoting current page number
    let pageRendered = document.createElement('p')
    pageNumber = (current_page) => {
        pageRendered.className = 'text'
        pageRendered.innerText = `Page ${current_page}`
        body.appendChild(pageRendered)
    }
    pageNumber(current_page)

    // Function to go to next page
    paginateForward = () => {
        // No more dog images are rendered past page 19
        // Only able to navigate to next page if current page is less than 19
        if(current_page < 19) {
            // As now not on 1st page, backward button functionality is introduced
            backwardBtn.disabled = false
            // Increment current page by 1
            current_page = current_page + 1
            // Start and end increased by 10 to grab next 10 dogs
            start = start + 10
            end = end + 10
            // Clearing pageDiv wrapper of children
            // New dogDiv with next 10 results will be new child node of pageDiv
            pageDiv.innerHTML = ''
            
            // Fetch request for next 10 results
            fetchPets(start, end)
            // Render curent page number with new current page
            pageNumber(current_page)

        } else {
            // Next page button disabled if on page 19
            // Else would be able to click through to blank pages, rending no dog images
            forwardBtn.disabled = true
        }
    }
    
    // Function to go to previous page
    paginateBackward = () => {
        // Only if current page in not the page 1, can move to previous page
        // Else we would be able to click through to negative page numbers
        if (current_page > 1) {
            // Enable previous page button
            backwardBtn.disabled = false
            // Decrement current page by 1
            current_page = current_page - 1
            // Start and end decreased by 10 to grab previous 10 dogs
            start = start - 10
            end = end - 10
            pageDiv.innerHTML = ''
            
            // Fetch previous 10 results & render current page number with new current page
            fetchPets(start, end)
            pageNumber(current_page)
        } else {
            // If current page is first page, previous page button disabled
            backwardBtn.disabled = true
        }
    }
    
    // Create the modal holding full-size image of dog
    let dialog = document.createElement('dialog');
    createModal = (photo) => {
        dialog.className = 'modal'
        document.body.appendChild(dialog);
        
        // Create div to hold 'Done' button for styling
        let modalDiv = document.createElement('div')
        modalDiv.className = 'exit-btn-div'
        dialog.appendChild(modalDiv)

        // Create 'Done' button to exit out of modal
        let exitBtn = document.createElement('button')
        exitBtn.innerText = 'Done'
        exitBtn.className = 'btn' 
        // This button has an id for styling
        exitBtn.id = 'exit-btn'
        exitBtn.dataset.name = 'exit-btn'
        modalDiv.appendChild(exitBtn)

        let fullImg = document.createElement('img')
        fullImg.className = 'full-img'
        fullImg.src = photo
        dialog.appendChild(fullImg)
    }

    // Function open model of desired dog image
    openModal = (photo) => {
        createModal(photo)
        dialog.showModal();
    }

    // Function to close modal on pressing 'Done' button
    closeModal = () => {
        dialog.close()
        // Clearing inner HTML of modal or else multiple images are 
        // appended to the modal on subsequent clicks
        dialog.innerHTML = ''
    }
  
    // Single event listener on body uses event delegation
    body.addEventListener('click', (event) => {
        // On clicking thumbnail
        if(event.target.className === 'pet-img') {
            let photo = event.target.src
            openModal(photo)
        }
        // On clicking next page
        if(event.target.dataset.name === 'forward-btn') {
            paginateForward()

        }
        // On clicking previous page
        if(event.target.dataset.name === 'backward-btn') {
            paginateBackward()
        }
        // On clicking 'Done' to exit modal
        if(event.target.dataset.name === 'exit-btn') {
            closeModal()
        }
    })
})