// handle | name | num_employees | description | logo_url
import { Link } from 'react-router-dom';

function CompanyCard({ company }) {
   const { name, description } = company;
   return (
      <div className="CompanyCard">
         <Link
            to={`/companies/${company.handle}`}
            className="CompanyCard-link"
         >
            <h2>{name}</h2>
         </Link>
         <p>{description}</p>
      </div>
   );
}

export default CompanyCard;
