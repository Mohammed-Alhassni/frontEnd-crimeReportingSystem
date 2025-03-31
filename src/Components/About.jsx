import '../styles/about.css';

function About(){
    return (
    <div className='aboutContainer'>
        <h1>About This Project</h1>
        <p>
            This project is developed as part of the  
            <strong> CodestStacker Challenge by Rihal</strong>. 
            It is designed to visualize crime reports and provide an interactive experience using mapping technologies.
            <strong>The crime data does not reflect real-world incidents.</strong>
        </p> 

        <h3>
            The website designed by: Mohammed Alhassni <br/>
            <a 
                href="https://www.linkedin.com/in/mohammed-al-hassni-38a84b2b1" 
                target="_blank" 
                rel="noopener noreferrer">
                Linkedin Profile
            </a>
        </h3>
    </div>
    );
}


export default About;