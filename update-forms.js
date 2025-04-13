const fs = require('fs');
const path = require('path');

const files = [
  'about.html',
  'blog.html',
  'contact.html',
  'faq.html',
  'index.html',
  'our-team.html',
  'pricing.html',
  'services.html',
  'single-team1.html',
  'single-team2.html',
  'software-development.html',
  'web-development.html'
];

const formTemplate = `
<form name="signup-form" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" netlify>
  <input type="hidden" name="form-name" value="signup-form">
  <p class="d-none">
    <label>Don't fill this out if you're human: <input name="bot-field"></label>
  </p>
  <p>
    <input type="email" name="email" placeholder="Your email address" required />
    <em class="paper-plane">
      <input type="submit" value="Sign up" />
    </em>
    <i class="fa fa-paper-plane-o"></i>
  </p>
</form>`;

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const oldFormRegex = /<form name="signup-form" method="POST" data-netlify="true">[\s\S]*?<\/form>/;
    content = content.replace(oldFormRegex, formTemplate);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}); 