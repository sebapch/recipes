
import { LikeButton } from './LikeButton.jsx';

const fetchPosts = () =>{
    return fetch('https://jsonplaceholder.typicode.com/posts', {cache: 'no-store'})
    .then(res => res.json())

}
//en lugar de cache no store, para ir cada tanto regenerando la pagina e actualice
//next:{revalidate: 10}

export  async function ListOfPosts (){

    const posts = await fetchPosts()

    console.log(posts)

 
    return posts.slice(0, 5).map(post =>(
                <div key={post.id}>
                    <h2 style={{color: 'red'}}> {post.title}</h2>
                    <p>{post.body}</p>
                    <LikeButton id={post.id} />
                </div>
            ))
}