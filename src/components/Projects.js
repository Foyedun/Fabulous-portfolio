import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import Hackathon from "../assets/img/hack.jpg";
import Hotel from "../assets/img/hotel.PNG";
import Vestium from "../assets/img/vest.jpg";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import light from "../assets/img/light.PNG"
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const projectsTab1 = [
    {
      title: "Hackathon Project",
      description: "Community Development",
      imgUrl: Hackathon,
    },
    {
      title: "Hotel Website",
      description: "Design & Development",
      imgUrl: Hotel,
    },
    {
      title: "Vestium Website",
      description: "Modern platform tailored to streamline wardrobe management and fashion discovery.",
      imgUrl: Vestium,
    },
  ];

  const projectsTab2 = [
    {
      title: "Mobile App",
      description: "UI/UX Design",
      imgUrl: projImg1,
    },
    {
      title: "Social Media Campaign",
      description: "Marketing Strategy",
      imgUrl: projImg2,
    },
    {
      title: "Analytics Dashboard",
      description: "Data Visualization",
      imgUrl: projImg3,
    },
  ];

  const tab3Image = "../assets/img/single-image.png"; 

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Projects</h2>
                  <p>I have worked on a diverse range of projects, each showcasing my creativity and technical expertise. From designing intuitive user interfaces to developing fully functional websites, my portfolio reflects a commitment to excellence and innovation.</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Tab 1</Nav.Link>
                      </Nav.Item>
                     
                      <Nav.Item>
                        <Nav.Link eventKey="second">Tab 2</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first">
                        <Row>
                          {
                            projectsTab1.map((project, index) => {
                              return (
                                <ProjectCard
                                  key={index}
                                  {...project}
                                />
                              )
                            })
                          }
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <Row>
                          {
                            projectsTab2.map((project, index) => {
                              return (
                                <ProjectCard
                                  key={index}
                                  {...project}
                                />
                              )
                            })
                          }
                        </Row>
                      </Tab.Pane>
                     
                    </Tab.Content>
                  </Tab.Container>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  );
};
