
import Image from "next/image";
import toast from "react-hot-toast";

const EditableImage = ({link, setLink}) =>{
    const handleImageChange = async (e) =>{
        const files = e.target.files;

        if(files?.length === 1){
            const data = new FormData();
            data.set('file', files[0])
    
           const uploadPromise =  fetch("/api/upload",{
            method: "POST",
            body: data
            }).then((response) =>{
                if(response.ok) {
                    return response.json().then(link=>{
                        setLink(link);

                    });
                }
                throw new Error("Something went wrong!");
            })
                

            await toast.promise(uploadPromise,{
                loading: "Uploading Image...",
                success: "Image Uploaded!",
                error: "Something went wrong!"
            })
            
        }
       
    } 
    return(
        <>
            {
                link && (
                    <Image 
                    draggable="false"
                    className={"rounded-lg w-full h-full mb-1"} 
                    src={link} 
                    alt={"avatar"} 
                    width={250} 
                    height={250}
                    />
                )
            }
            {
                !link && (
                    <div className="bg-gray-200 py-6 px-4 mb-1 rounded-lg text-gray-500 mx-auto text-center">
                        No image
                    </div>
                )
            }
            
            <label>
                <input 
                type="file" 
                onChange={handleImageChange}
                hidden />
                <span className="button cursor-pointer">Edit</span> 
            </label>
        </>
    )
}

export default EditableImage;