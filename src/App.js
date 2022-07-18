import { useQuery, gql } from '@apollo/client';

const JOBS_QUERY = gql`
{
  jobs {
    title
    tags (first: 3) {
      name
    }
    cities {
      name
    }
    remotes {
      name
    }
    company {
      name
    }
    applyUrl
  }
}
`;


function App() {
  const jobsQuery = useQuery(JOBS_QUERY); 

  if (jobsQuery.error) return <h1>Error: {jobsQuery.error} :( </h1>;

  jobsQuery.loading ? <h1>Loading...</h1> : (
    <div className="app">
      <h1>My first Apollo app 🚀</h1>
      {jobsQuery.data.jobs.map((item, index) => (
        <a href={item.applyUrl} className='job' key={index}>
          <div className='job-desc'>
            <img src='https://logo.clearbit.com/newstorycharity.org?size=200' alt='logo'/>
            <div className='job-title'>
              <h2>{item.title}</h2>
              <div className='company'>{item.company.name}</div>
            </div>
            <ul>
              {item.tags.map((tag, index) => (
                <li key={index}>{tag.name}</li>
              ))}
            </ul>
          </div>
          <div className='job-location'>
              <span>{item.cities.map(city => city.name).join(', ')}</span>
              <i>{item.remotes.map(remote => remote.name)}</i>
          </div>
        </a>
      ))}
    </div>
  );
}

export default App;
