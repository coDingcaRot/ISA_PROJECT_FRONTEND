// Common Functionalities. Currently Unused.
class Utilities{
    backLink(elementName , id, page){
        if(id){
            const backButton = document.getElementById(elementName);
            this.attachEventListener(backButton, "click", () => {console.log("event listener by id")})
        } else{
            const backButton = document.getElementsByClassName(elementName);
            this.attachEventListener(backButton, "click", () => {console.log("event listener by class")})
        }   
    }

    attachEventListener(element, eventType, event){
        element.addEventListener(eventType, event);
    }
}

