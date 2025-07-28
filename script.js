fetch('data/projects.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('project-sections');

    for (const [category, projects] of Object.entries(data)) {
      if (projects.length === 0) continue;

      // Create section for each category
      const section = document.createElement('section');

      section.innerHTML = `
        <h2 class="text-jasmine-700 text-2xl font-bold capitalize mb-4">${category}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 "></div>
      `;

      const grid = section.querySelector('div');
      // Create a Card for each project

     projects.forEach(project => {
      const card = document.createElement('div');
      card.className = `
  border-4 
  border-solid 
  border-jasmine-700 
  hover:bg-jasmine-700 
  rounded 
  shadow 
  hover:shadow-lg 
  transition 
  duration-200 
  transform 
  hover:scale-[1.015] 
  flex 
  flex-col 
  group 
  overflow-hidden
    `.trim();
    

      // Image
      const imgEl = document.createElement('img');
      imgEl.src = project.image;
      imgEl.alt = project.title;
      imgEl.className = `
      p-2
  object-cover 
  w-[calc(100%+2rem)] 
  h-40 
  self-center 
  rounded-t
    `.trim();

      if (!project.url) {
        imgEl.classList.add('cursor-pointer', 'hover:opacity-90');
        imgEl.addEventListener('click', () => {
          document.getElementById('modalImage').src = project.image;
          document.getElementById('imageModal').classList.remove('hidden');
        });
      }

      // Title
      const title = document.createElement('h3');
      title.className = `
      text-xl 
      font-semibold 
      px-4
      text-jasmine-600 
      group-hover:text-bistre-100 
      transition-colors 
      duration-200
    `.trim();
          title.textContent = project.title;

      // Description
      const desc = document.createElement('p');
      desc.className = 'px-4 text-ash_gray-100 mb-4 flex-grow';
      desc.textContent = project.description;

      // Read more link
      if (project.url) {
        const link = document.createElement('a');
        link.href = project.url;
        link.className = 'px-4 text-light_blue-200 font-medium hover:underline mt-auto';
        link.textContent = 'Read more →';
        card.append(imgEl, title, desc, link);
      } else {
        card.append(imgEl, title, desc);
      }

      grid.appendChild(card);
    });


      container.appendChild(section);
    }
  })
  .catch(err => {
    console.error("Failed to load project data:", err);
  });
  document.getElementById('imageModal').addEventListener('click', () => {
    document.getElementById('imageModal').classList.add('hidden');
  });
  
