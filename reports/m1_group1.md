# **Milestone 1 Report**

## **1. Project Status Summary and Planned Changes**

We have completed the requirements elicitation phase and, based on the collected requirements, have concurrently developed the backend and frontend at a basic level. The backend and frontend have been integrated, enabling fundamental functionalities. Currently operational features at a basic level include:

- **User Registration**
- **User Login**
- **Post Creation**
- **Commenting System**

Some additional features are visually represented in the frontend but are not yet functional. To progressively implement these additional features, we have created issues in our repository and assigned them to team members for continued development.

In the initial phase, deployment was delayed due to extensive internal meetings aimed at establishing clear guidelines and alignment on best practices before beginning the coding process. Consequently, we were unable to present a deployed version during the initial milestone demonstration, opting instead to showcase the frontend locally using mock data. Despite this initial deployment delay, it was anticipated during our planning phase, so we do not expect further delays in upcoming milestones.

### **Next Steps**

- Incrementally implement remaining functionalities, guided by created and assigned issues.
- Maintain the original project architecture; no major changes are currently anticipated.
- Continue aligning our efforts with the initial schedule for future milestones.

---

## **2. Customer Feedback and Reflections**

We have successfully conducted our initial presentation with the customer, demonstrating all the features outlined in our requirements document. Overall, the feedback received was positive, and the customer appreciated our initial work. However, several detailed requests and additional features were suggested:

1. **Voting Mechanism**

   - Instead of directly voting on posts, users should be able to vote on individual components within each post. The overall post score would be calculated by averaging these component scores.

2. **Visibility of Solved Posts**

   - Solved posts should be more prominently displayed on the homepage.

3. **Gallery View for Images**

   - Multiple uploaded images should be displayed in a gallery format, allowing users to navigate between them easily.

4. **Multiple Locations in User Profiles**

   - Users should be able to specify more than one location in their profiles.

5. **Ranking vs. Reputation**

   - Replace the current ranking system with a reputation-based system.

6. **Advanced Search Logic (AND/OR Clarification)**

   - If multiple selections are made within the same category, clarify or allow users to choose whether these selections are combined using “AND” or “OR.”

7. **Semantic Search**

   - Emphasize the importance of semantic search with Wikidata tags.

8. **Comment Filtering**

   - Provide functionality to filter and sort comments based on different comment types (e.g., hints, expert answers, questions).

9. **Image Upload via URL**
   - Allow image uploads not only from the local filesystem but also via URLs.

### **Reflection and Planned Actions**

- We created GitHub issues for features explicitly requested by the customer. For “nice to have” ideas, we opened issues to discuss and prioritize them internally before deciding on implementation.
- The deployment delay at the first milestone was due to extended planning and discussion phases; we showcased a mock-data version locally. However, a deployed version was shared with the customer soon after.
- We plan to make future presentations more concise and organized, focusing on showcasing additional features within a shorter timeframe.

---

## **3. Delivered Artifacts and Status**

### **3.1 Software [Requirements Specification](https://github.com/usanli/SWE574-G1/wiki/Requirements-Specification)**

- **Link:** [Requirements Specification](https://github.com/usanli/SWE574-G1/wiki/Requirements-Specification)
- Currently reflects our initial customer-agreed requirements. However, we will revise and refine sections based on new customer feedback.

### **3.2 Software Design (UML Diagrams)**

- **Link:** [Design Diagrams](https://github.com/usanli/SWE574-G1/wiki/Design-Documents#future-implementation-details-in-diagrams)
- Outlines our initial architectural decisions. Updates may be necessary as we incorporate new feedback.

### **3.3 Scenarios and [Mockups](https://github.com/usanli/SWE574-G1/wiki/Design-Documents#mock-up-screens)**

- **Link:** [Mockups](https://github.com/usanli/SWE574-G1/wiki/Design-Documents#mock-up-screens)
- Represents the current vision for the user interface. Further refinements may be made as needed.

### **3.4 Project Management Documents**

- **Project Plan & Communication Plan:** Maintained regularly.
- **Responsibility Assignment Matrix (RAM):** Not used, as we adopt a collaborative approach with dynamic task assignment via GitHub Issues.

### **3.5 Weekly Reports and Meeting Notes**

- Regularly documented and organized.
- **Link:** [In-Class Meet-Ups](https://github.com/usanli/SWE574-G1/wiki/In%E2%80%90Class-Meet%E2%80%90Ups)

### **3.6 Milestone Review**

- This report itself serves as our official Milestone 1 review.

### **3.7 Software Pre-release**

- Dockerized and deployed.
- **Pre-release Name:** `0.1.0-alpha`
- **Tag Name:** `customer-milestone-1`
- **Deployment Links:**
  - Web Application: [https://namethatforme-frontend-latest.onrender.com](https://namethatforme-frontend-latest.onrender.com)
  - Mobile Application: [https://namethatforme-frontend-latest.onrender.com](https://namethatforme-frontend-latest.onrender.com)
    (To access mobile application, navigate to link with a mobile device and download the application from the popup)
  - Backend Application: [https://backend-s5cn.onrender.com](https://backend-s5cn.onrender.com)

---

## **4. Evaluation of the Status of Deliverables and Impact on Project Plan**

All delivered artifacts are still at a foundational stage. Given the early phase, it is premature to measure satisfaction purely by quality metrics; however, our progress has thus far aligned well with our project plan and deadlines.

Aside from the initial deployment delay—which was accounted for in our schedule—no other significant deliverables are delayed or incomplete. As a result, our project timeline remains intact, and we remain confident about meeting future milestones on time.

We foresee no unique risks beyond the typical challenges associated with software development (e.g., integration, technical hurdles). To expedite future progress, we have established local development environments for each team member and ensured both frontend and backend are dockerized. Our next steps will focus on feature development, tracked via GitHub Issues, which we believe will streamline collaboration and delivery speed.

---

## **5. Evaluation of Tools and Processes Used for Project Management**

We rely primarily on GitHub for project management, employing:

- **GitHub Issues:**  
  Comprehensive task management and progress tracking, labeling, and milestone assignments.
- **GitHub Wiki:**  
  Central repository for documentation (requirements, design documents, meeting notes, etc.).
- **GitHub Projects:**  
  Visual overview of current task status, completed items, and pending work.

### **Process Reflection and Improvement Opportunities**

- **Weekly Meetings:** Our team holds consistent weekly meetings to review progress, resolve issues, and allocate tasks.
- **Task Distribution:** Despite varied workloads, we aim for an equitable distribution over the entire project timeline.
- **Communication:** Internal communication is effective; we plan to continue refining our approach based on team availability and project needs.

---

## **6. Requirements Addressed in This Milestone**

We have successfully implemented the following core requirements:

- **User Registration**
- **User Login and Authentication**
- **Post Creation** (basic level, including a single multimedia element)
- **Commenting Functionality** (basic commenting on posts)

While these features meet the minimal requirements of our specification, many advanced functionalities remain for future milestones (e.g., moderation features, search enhancements, notification systems, and comprehensive user profiles). Upcoming revisions to our requirements specification will reflect newly requested features and clarifications from the customer.

---

## **7. Individual Contributions**

### **Member: Umut Şanlı**

**Responsibilities:**

- Oversaw the integration of the backend and frontend components.
- Facilitated smooth communication among team members, especially regarding technical alignment.

**Main Contributions:**

- Connected foundational backend APIs with the initial frontend structure, ensuring core functionalities (registration, login, post creation, commenting) worked end-to-end.

**Code-Related Significant Issues:**

- **Backend-Frontend Mass Initial Change**
  - [[PR #33](https://github.com/usanli/SWE574-G1/pull/33)](https://github.com/usanli/SWE574-G1/pull/33)

**Non-Code-Related Contributions:**

- Actively participated in team meetings to coordinate tasks.
- Helped ensure the deployment process was well-documented and transparent.

---

### **Member: Salih Kahyaoğlu**

**Responsibilities:**

- Set up and established the foundational backend architecture.
- Implemented key API endpoints to support user and post-related operations.

**Main Contributions:**

- Built and deployed the initial backend, including user authentication, and post and comment functionalities.
- Core database architecture

**Code-Related Significant Issues:**

- **Initialize Backend** — [[PR #9](https://github.com/usanli/SWE574-G1/pull/9)](https://github.com/usanli/SWE574-G1/pull/9)
- **User Endpoints** — [[PR #12](https://github.com/usanli/SWE574-G1/pull/12)](https://github.com/usanli/SWE574-G1/pull/12)
- **Post and Comment Endpoints** — [[PR #14](https://github.com/usanli/SWE574-G1/pull/14)](https://github.com/usanli/SWE574-G1/pull/14)

**Non-Code-Related Contributions:**

- Actively participated in meetings and reviewed frontend code.

---

### **Member: Mehmet Oğuz Aydın**

**Responsibilities:**

- Frontend Initialization

**Main contributions:**

- Created frontend skeleton for customer demo

**Code-related significant issues:**

- #8 : Built the frontend prototype for Milestone 1 with React (Next.js) and TailwindCSS (GH-11 & GH-16)
- #31 : Added PWA functionality on top of our frontend application with `next-pwa`(GH-32)

**Non-code-related significant issues:**

- Reviewed GH-14 and GH-12

**Additional information:**

- Prepared few requirement elicitation questions to ask to customer.
- Contributed to requirements specification phase.

---

Member: Bilge Akpulat

Responsibilities:

- Keeping notes from meetings and lessons, organizing and sharing with the group(common goal),
- Creating Mock-Up Stories and visual representaions(preparing Figma interfaces),
- Prepared and maintained design documentation, including UML diagrams and mockup screens. Demonstrated flows for features that are not implemented on web through platforms such as Drawio, Lucidchart.

Main contributions: Organized and coordinated demonstration materials for presentations.
Played a key role in assembling the demo presentation, ensuring clarity in feature demonstrations.

Non-Code-Related Contributions:
Helped maintain comprehensive project documentation for both team members and stakeholders.

Significant issues:
[Create Mock-Ups #2](https://github.com/usanli/SWE574-G1/issues/2)
[Finalize Communication plan #4](https://github.com/usanli/SWE574-G1/issues/4)
Code-related significant issues: Reviewed [Initialize backend #9 ](https://github.com/usanli/SWE574-G1/pull/9)

Additional information:
Prepared few requirement elicitation questions to ask to customer.
Contributed to requirements specification phase.

---

### **Member: İbrahim Kalaycı**

**Responsibilities:**

- Contributed to project planning, feature discussions, and issue reviews.
- Assisted in refining requirements and identifying improvement opportunities.

**Main Contributions:**

- Provided input during the requirements elicitation phase, ensuring alignment with customer feedback.
- Supported the review process for frontend and backend implementations, offering critical feedback to maintain quality standards.
- Participating in the customer-milestone-1 presentation and summarizing other teams’ presentations for the team.

**Non-Code-Related Contributions:**

- Actively participated in regular team meetings, facilitating discussion and aiding in decision-making.
- Engaged in initial customer presentations, helping address questions and clarifications.

**Significant Issues:**

- [Requirements Specification#1](https://github.com/usanli/SWE574-G1/issues/1)
- [Feedback for Other Groups #18](https://github.com/usanli/SWE574-G1/issues/18)

---

### **General Workflow & Task Distribution**

We intentionally chose not to formalize a Responsibility Assignment Matrix (RAM), as we wanted every team member to have the flexibility to contribute to any aspect of the project. Instead, we utilize GitHub Issues to dynamically assign tasks based on each individual’s availability and expertise. All members actively participate in discussions, meetings, and decision-making processes, ensuring effective coordination and productivity.
