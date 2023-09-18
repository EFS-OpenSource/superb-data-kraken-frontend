<p align="center">
    <img src="public/img/superbdatakraken_white.png" alt="SDK LOGO"/>
</p>

<p align="center">
    <em>A data platform for everyone</em>
</p>

<br/>
<br/>

# SUPERB DATA KRAKEN

**An automated data platform to capture, process, analyze and present your data**

From your data to your insights in interactive dashboards within minutes. Automation of knowledge extraction  
through customizable workflows.

SDK is more than just a business intelligence platform as a data platform. Reacquaint yourself with your  
company's data and learn how to leverage it further!
<br/>
<br/>
<br/>
    <img src="public/img/sdk_readme_img_1.png" alt="SDK at work" style="width: 800px"/>
<br/>
<br/>

# How does it work?


SDK is divided into different components that can be combined according to your preferences. It all starts  
with data upload. In this process, data is processed through a secure area and transferred to the desired  
storage location.

During the upload, metadata is captured and processed in a search engine. If needed, this data can be made  
fully searchable based on content. Automated analysis takes place through workflows, which can be generated  
and customized as per requirements and preferences.

The results are then stored in appropriate databases and visualized through interactive dashboards. Users  
can access the data and the insights derived from it. Of course, access permissions can be managed and  
personalized by the admin at any time.
<br/>
<br/>
<br/>

<div>
    <img src="public/img/sdk_readme_img_2.png" alt="SDK at work 2" style="width: 800px"/>
</div>
<br/>
<br/>

# What is beyond your data?

Everyone has the feeling of knowing their company's data and consequently makes decisions based on this feeling.  
It would be better to bring the data together and analyze it to turn feelings into facts and let them speak.  
We're here to help you build the infrastructure for your data.

The goal is to generate knowledge from corporate data using custom processing pipelines. Make company decisions  
based on facts and lead your business into a successful and sustainable future with a data strategy.
<br/>
<br/>

# Superb Data Kraken Frontend

**Superb Data Kraken Frontend** is the frontend component of the Superb Data Kraken project. It provides a  
user-friendly interface for interacting with and managing data using the Superb Data Kraken backend.  
It uses React and Typescript in

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User-friendly Interface:** Superb Data Kraken Frontend offers an intuitive and user-friendly interface  
    for managing your data effortlessly.

- **Data Visualization:** Visualize your data with stunning charts and graphs to gain insights quickly.

- **Data Management:** Easily upload, download, and manage your data files within the platform.

- **User Authentication:** Securely access your data with user authentication and authorization features.

- **Responsive Design:** The frontend is designed to work seamlessly on computer screens and tablet devices.

## Getting Started

To get started with Superb Data Kraken Frontend, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/EFS-OpenSource/superb-data-kraken-frontend.git
   ```

2. **Install dependencies:**

    ```bash
    cd superb-data-kraken-frontend
    npm install
    ```

3. **Configuration:**

    - Copy the .env.template configuration file and adjust it as needed:  

    ```bash
    cp .env.template .env
    ```

    - Update the environment variables in the .env file with your configuration details.

    - Copy the OidcTrustedDomainsTemplate.js configuration file and adjust it as needed:  
  
    ```bash
    cd public
    cp OidcTrustedDomainsTemplate.js OidcTrustedDomains.js
    ```

    - Update the trustedDomains array in the OidcTrustedDomains.js file with your configuration details.

4. **Run the Development Server:**

    - Return to your project root folder.  

    ```bash
    npm start
    ```

5. **Access the Frontend:**

    - Open your web browser and navigate to http://localhost:4200 to access the Superb Data Kraken Frontend.




## License

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details.
