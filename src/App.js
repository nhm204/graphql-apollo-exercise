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
  const { loading, error, data } = useQuery(JOBS_QUERY); 

  if (error) return <h1>Error: {error} :( </h1>;

  loading ? <h1>Loading... 🚀</h1> : (
    <div className="app">
      <h1 style={{ backgroundColor: 'beige' }}>My first Apollo app 🚀</h1>
      <div className='feature-tag'>FEATURED</div>
      {data.jobs.map((item, index) => (
        <a href={item.applyUrl} className='job' key={index}>
          <div className='job-desc'>
            <img src='https://logo.clearbit.com/www.mojotech.com?size=200' alt='logo'/>
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