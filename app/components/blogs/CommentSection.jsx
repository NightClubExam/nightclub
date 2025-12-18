//Alberte Remmer

//Måske use server? 
import CommentForm from "../forms/CommentForm";



const CommentSection = async() => {
    // Hent kommentarer fra API
    const response = await fetch ("http://localhost:4000/comments", {
        cache: "no-store" // Sikrer at data altid er frisk (browseren gemmer ikke data i cachen - men henter altid det nye) 
    });
    const data = await response.json();
    const comments = data; //API'et bruger content som nøgle til comments
    
    return (
      <div className="mb-8 max-w-[80vw] mx-auto">
        <h2 className="mb-6">{comments.length} Comments</h2>
        <div className="space-y-6">
          {comments.map((data) => (
            <div key={data.id} className="border-b pb-4">
              <div className="flex items-center mb-2">
                <h3>{data.name} -</h3>
                <span className="text-accent mx-2 font-medium text-xl">
                  Posted{" "}
                  {new Date(data.date).toLocaleDateString("da-DK", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <p className="text-white text-xl mt-2">{data.content}</p>
            </div>
          ))}
        </div>
        <CommentForm />
      </div>
    );
}
 
export default CommentSection;