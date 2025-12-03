//Alberte Remmer
"use server";

export const submitContactForm = async (prevState, formData)=>{
    // FormData: er et objekt der indeholder alle værdierne fra formularen.
    const name = formData.get("name"); // Henter værdien af inputfeltet med navn
    const email = formData.get("email");
    const comment = formData.get("comment");

    // Opretter et objekt der holder styr på formularens tilstand (state) 
    const state = {
        success: null, // Status for besked; null = ikke sendt, true = sendt, false = fejl
        errors: {}, // fejlbeskeder for hvert felt
        fields: {name, email, comment} // Gemmer brugerens input, så det kan vises igen ved fejl 
    }

    // validering af navn:
    if(!name){ //Hvis navnefeltet er tomt:
        state.errors.name = "Name is required";
    }else if (name.length < 2){ //Hvis navnet er kortere end 2 tegn:
        state.errors.name = "Name must be at least 2 characters long";
    }

    // Validering af email:
    if(!email){ //Hvis emailfeltet er tomt:
        state.errors.email = "Email is required";
    } else if (!email.includes("@")){ //Hvis email ikke indeholder @:
        state.errors.email = "Email must contain @";
    } else if (email.includes(" ")){ //Hvis email indeholder mellemrum:
        state.errors.email = "Email must not contain spaces";
    }

    // Validering af kommentar: 
    if (!comment){ //Hvis kommentarfeltet er tomt
        state.errors.comment = "Comment is required";
    } 

    // Hvis der er fejl, returnere state en fejlbesked: 

    // - state.errors et objekt, som gemmer fejlene fra hvert felt
    // - Object.keys(state.erros) laver et array med alle de felter, hvor der er fejl
    // - .length > 0 tjekker om der er nogle fejl i arrayet (altså mindst én fejl) 
    if (Object.keys(state.errors).length > 0 ){
        return state;
    }

    //Hvis der ikke er fejl:
    state.success = true;
    return state;
}
 