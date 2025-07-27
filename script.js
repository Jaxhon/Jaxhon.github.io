fetch('data/projects.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('project-sections');

    for (const [category, projects] of Object.entries(data)) {
      if (projects.length === 0) continue;

      // Create section for each category
      const section = document.createElement('section');

      section.innerHTML = `
        <h2 class="text-2xl font-bold capitalize mb-4">${category}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"></div>
      `;

      const grid = section.querySelector('div');
      // Create a Card for each project
      projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded shadow hover:shadow-lg transition flex flex-col';
      
        // Create image element
        const imgEl = document.createElement('img');
        imgEl.src = project.image;
        imgEl.alt = project.title;
        imgEl.className = 'rounded mb-4 object-cover w-full h-40 bg-gray-100';
      
        if (!project.url) {
          imgEl.classList.add('cursor-pointer', 'hover:opacity-90');
          imgEl.addEventListener('click', () => {
            document.getElementById('modalImage').src = project.image;
            document.getElementById('imageModal').classList.remove('hidden');
          });
        }
      
        // Title
        const title = document.createElement('h3');
        title.className = 'text-xl font-semibold mb-2';
        title.textContent = project.title;
      
        // Description
        const desc = document.createElement('p');
        desc.className = 'text-gray-600 mb-4 flex-grow';
        desc.textContent = project.description;
      
        // Read more (if URL exists)
        if (project.url) {
          const link = document.createElement('a');
          link.href = project.url;
          link.className = 'text-orange-500 font-small hover:underline mt-auto';
          link.textContent = 'Read more..';
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
  
