const fs = require('fs');
const path = require('path');

// Base directory
const baseDir = path.resolve(__dirname, '..');

// Template file
const templatePath = path.join(baseDir, 'template', 'page-template.html');
const templateContent = fs.readFileSync(templatePath, 'utf8');

// Page structure definition
const pages = [
  // Learn section
  {
    path: 'learn/index.html',
    title: 'Learn About Vibe Coding',
    content: `
      <section class="page-header">
        <div class="container">
          <h1>Learn About <span class="accent">Vibe Coding</span></h1>
          <p>Discover the fundamentals, benefits, and history of AI-powered development</p>
        </div>
      </section>
      
      <section class="content-section">
        <div class="container">
          <div class="content-grid">
            <div class="content-card">
              <h2>What is Vibe Coding?</h2>
              <p>Understand the core concept of vibe coding and how it's transforming software development.</p>
              <a href="/learn/what-is-vibe-coding.html" class="button secondary">Learn More</a>
            </div>
            <div class="content-card">
              <h2>Pros & Cons</h2>
              <p>Explore the advantages and potential challenges of adopting vibe coding in your workflow.</p>
              <a href="/learn/pros-and-cons.html" class="button secondary">Learn More</a>
            </div>
            <div class="content-card">
              <h2>History & Key Figures</h2>
              <p>Learn about the origins of vibe coding and the influential people who shaped its development.</p>
              <a href="/learn/history-key-figures.html" class="button secondary">Learn More</a>
            </div>
            <div class="content-card">
              <h2>Core Concepts</h2>
              <p>Dive into the fundamental principles and techniques that make vibe coding effective.</p>
              <a href="/learn/core-concepts.html" class="button secondary">Learn More</a>
            </div>
          </div>
        </div>
      </section>
    `
  },
  {
    path: 'learn/what-is-vibe-coding.html',
    title: 'What is Vibe Coding?',
    content: `
      <section class="page-header">
        <div class="container">
          <h1>What is <span class="accent">Vibe Coding</span>?</h1>
          <p>A comprehensive explanation of the revolutionary approach to software development</p>
        </div>
      </section>
      
      <section class="content-section">
        <div class="container">
          <div class="content-columns">
            <div class="content-main">
              <h2>Definition & Overview</h2>
              <p>Vibe coding is an emerging development approach that leverages AI tools to transform natural language prompts into functional code. It blends intuitive communication with powerful code generation, making development more accessible and efficient.</p>
              <p>Rather than writing every line manually, developers "vibe" with AI assistants through conversation, describing their intent and collaboratively refining the output.</p>
              
              <h2>Key Characteristics</h2>
              <ul>
                <li><strong>Conversational Development:</strong> Using natural language to describe what you want to build</li>
                <li><strong>AI Collaboration:</strong> Working with AI tools as coding partners rather than just utilities</li>
                <li><strong>Rapid Prototyping:</strong> Quickly generating functional code from high-level descriptions</li>
                <li><strong>Iterative Refinement:</strong> Progressively improving code through ongoing dialogue with AI</li>
              </ul>
              
              <h2>How It Works</h2>
              <p>In a typical vibe coding workflow:</p>
              <ol>
                <li>The developer describes what they want to build in natural language</li>
                <li>The AI assistant generates code based on the description</li>
                <li>The developer reviews the code, provides feedback, and asks for refinements</li>
                <li>The AI makes adjustments based on the feedback</li>
                <li>This cycle continues until the code meets the developer's requirements</li>
              </ol>
              
              <h2>Who Uses Vibe Coding?</h2>
              <p>Vibe coding is being adopted by a diverse range of people:</p>
              <ul>
                <li>Professional developers looking to accelerate their workflow</li>
                <li>Beginners learning to code with AI assistance</li>
                <li>Non-technical founders building MVPs</li>
                <li>Designers implementing their own UI components</li>
                <li>Students exploring programming concepts</li>
              </ul>
            </div>
            <div class="content-sidebar">
              <div class="sidebar-box">
                <h3>Popular Vibe Coding Tools</h3>
                <ul>
                  <li><a href="/tools/reviews/cursor.html">Cursor</a></li>
                  <li><a href="/tools/reviews/claude.html">Claude</a></li>
                  <li><a href="/tools/reviews/replit.html">Replit</a></li>
                </ul>
              </div>
              <div class="sidebar-box">
                <h3>Related Resources</h3>
                <ul>
                  <li><a href="/learn/pros-and-cons.html">Pros & Cons of Vibe Coding</a></li>
                  <li><a href="/prompts/techniques.html">Effective Prompting Techniques</a></li>
                  <li><a href="/community/showcase.html">See Vibe Coding Projects</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  },
  // Add more pages here...
];

// Create directories if they don't exist
const directories = [
  'learn',
  'tools',
  'tools/reviews',
  'prompts',
  'community',
  'news'
];

directories.forEach(dir => {
  const dirPath = path.join(baseDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
});

// Generate HTML files
pages.forEach(page => {
  const { path: pagePath, title, content } = page;
  const fullPath = path.join(baseDir, pagePath);
  
  // Make sure the directory exists
  const dirPath = path.dirname(fullPath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  // Replace placeholders in template
  let pageContent = templateContent
    .replace('PAGE_TITLE', title)
    .replace('<!-- PAGE CONTENT GOES HERE -->', content);
  
  // Write the file
  fs.writeFileSync(fullPath, pageContent);
  console.log(`Generated: ${fullPath}`);
});

console.log('All pages generated successfully!');