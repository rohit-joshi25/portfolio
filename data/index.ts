export const navItems = [
  // { name: "Home", link: "/" },
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "Built a complete Smart School Management System from scratch",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "Tech Stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently building a Manufacturing ERP",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "The SavantX-Company Portfolio",
    des: "Showcasing the diverse projects, services, and innovations of SavantX Technologies with a sleek and modern interactive portfolio website.",
    img: "/p1.svg",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
    link: "/ui.earth.com",
  },
  {
    id: 2,
    title: "School Management System",
    des: "An all-in-one digital solution for schools to manage students, staff, attendance, exams, and communication with ease and efficiency.",
    img: "/p2.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/stream.svg", "/c.svg"],
    link: "/ui.yoom.com",
  },
  {
    id: 3,
    title: "SavantXtruck",
    des: "A powerful logistics and fleet management platform designed to optimize dispatch, route planning, driver communication, and delivery tracking.",
    img: "/p3.svg",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
    link: "/ui.aiimg.com",
  },
  {
    id: 4,
    title: "Sansani Express News",
    des: "A modern digital news platform built for real-time regional news publishing, featuring responsive design, fast loading, and user-friendly content management.",
    img: "/p4.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/gsap.svg"],
    link: "/ui.apple.com",
  },
];

export const testimonials = [
  {
    quote:
      "Working with Raushan was a fantastic experience. His deep understanding of school and office management systems, combined with clean design and seamless functionality, made the entire process effortless. He not only delivered our website on time but also ensured every feature worked flawlessly. If you want a reliable developer who brings both technical skill and business understanding, Raushan is the one.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Raushan’s ability to turn complex requirements into easy-to-use platforms is impressive. From real estate to news portals, his versatility and dedication to quality helped us launch quickly and efficiently. The support post-launch has been top-notch too. Highly recommended for any web-based project!",
    name: "Sonal Mehta",
    title: "Project Manager at WebInSync",
  },
  {
    quote:
      "“We’re incredibly satisfied with the results. The Savants’ team was responsive, professional, and truly invested in our success.”",
    name: "-Deepak",
    title: "–Legalpalz",
  },
  {
    quote:
      "“The team’s dedication to our project was evident from start to finish. Their tailored solutions and proactive approach exceeded our expectations.”",
    name: "Aman",
    title: "-Cubicuss",
  },
  {
    quote:
      "“The SavantX provided us with an excellent software solution to manage our news online seamlessly. Their system is efficient, easy to use, and their support is always reliable. Highly recommended!”",
    name: "Team ",
    title: "-Sansani express news",
  },
];

export const companies = [
  {
    id: 1,
    name: "The SavantX",
    img: "/cloud.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "Sansani Express News",
    img: "/app.svg",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "DriveX",
    img: "/host.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "Cubicuss",
    img: "/s.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "Legalpalz",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Laravel Full-Stack Developer",
    desc: "Developing and maintaining full-stack web applications using Laravel PHP for over 4 years, ensuring efficient back-end processes and user-friendly front-end interfaces. Also have 2 years of hands-on experience working with CRM systems, customizing and integrating CRM solutions to meet business needs.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "MERN Developer - The SavantX",
    desc: "Developed and deployed full-stack web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js). Designed interactive and responsive front-end interfaces, built robust REST APIs, and implemented secure authentication systems. Contributed to key projects focused on business automation and management systems.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Freelance Web App Dev Project",
    desc: "Led the end-to-end development of a custom web application for a client, from initial planning and UI/UX design to backend development and deployment. Built scalable features, integrated third-party APIs, and implemented secure user authentication. Delivered a responsive, high-performance solution tailored to the client's business needs, with ongoing support and maintenance.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "Engineer Trainee- Tata Technologies",
    desc: "Accomplish my industrial Training in the Basics of Industrial Robotics, Product Design and development, Mechatronics and IoT, and Advanced Manufacturing conducted at CIIIT IKGPTU-Kapurthala",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
  },
  {
    id: 2,
    img: "/twit.svg",
  },
  {
    id: 3,
    img: "/link.svg",
  },
];
