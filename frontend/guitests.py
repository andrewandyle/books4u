import selenium
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains

# selenium tests for frontend code
class tests(unittest.TestCase):
    def setUp(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument('--window-size=1920,1080')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument("--no-sandbox")
        self.driver = webdriver.Chrome(
            "./node_modules/chromedriver/bin/chromedriver", options=chrome_options
        )
        self.wait_time = 50
        # self.root_url = "https://booksforyou.me"
        self.root_url = "http://localhost:3000"
        

    def test_landing(self):
        # test buttons on landing page
        self.driver.get(f"{self.root_url}")
        self.driver.implicitly_wait(self.wait_time)
        assert self.driver.title == "Books For You"
        
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[3]/div/a[1]').click()
        assert f"{self.root_url}/books" in self.driver.current_url

        self.driver.get(f"{self.root_url}")
        self.driver.implicitly_wait(self.wait_time)
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[3]/div/a[2]').click()
        assert f"{self.root_url}/authors" in self.driver.current_url

        self.driver.get(f"{self.root_url}")
        self.driver.implicitly_wait(self.wait_time)
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[3]/div/a[3]').click()
        assert f"{self.root_url}/quotes" in self.driver.current_url

    def test_navbar(self):
        self.driver.get(f"{self.root_url}")
        self.driver.implicitly_wait(self.wait_time)
        
        # About Button
        self.driver.find_element_by_xpath('//*[@id="root"]/div/nav/div/ul/li[1]/a').click()
        assert f"{self.root_url}/about" in self.driver.current_url
        
        # Books Button
        self.driver.find_element_by_xpath('//*[@id="root"]/div/nav/div/ul/li[2]/a').click()
        assert f"{self.root_url}/books" in self.driver.current_url

        # Authors Button
        self.driver.find_element_by_xpath('//*[@id="root"]/div/nav/div/ul/li[3]/a').click()
        assert f"{self.root_url}/authors" in self.driver.current_url

        # Quotes Button
        self.driver.find_element_by_xpath('//*[@id="root"]/div/nav/div/ul/li[4]/a').click()
        assert f"{self.root_url}/quotes" in self.driver.current_url

        # Search Bar
        self.driver.find_element_by_xpath('//*[@id="authors-search"]/input').send_keys("fiction")
        self.driver.find_element_by_xpath('//*[@id="root"]/div/nav/div[2]/button').click()
        assert f"{self.root_url}/search/q=fiction/model=all" in self.driver.current_url

    def test_about(self):
        # go to about us page
        self.driver.get(f"{self.root_url}/about")
        self.driver.implicitly_wait(self.wait_time)
        # verify title
        title = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[1]/div/h1').text
        assert title == "About Us"
        # check different sections of the about page
        section = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[2]/h1').text
        assert section == "Development Team"
        commits = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[3]/div[1]/h3[1]').text
        assert "Total Commits" in commits
        issues = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[3]/div[1]/h3[2]').text
        assert "Total Issues" in issues
        issues = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[3]/div[1]/h3[3]').text
        assert "Total Unit Tests" in issues

    def test_books(self):
        self.driver.get(f"{self.root_url}/books")
        self.driver.implicitly_wait(self.wait_time)
        # test clicking on item
        book_card = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[3]/a[1]/div')
        actions = ActionChains(self.driver)
        actions.move_to_element(book_card).click().perform()
        assert f"{self.root_url}/book/0" in self.driver.current_url

        # Sort by Name
        self.driver.get(f"{self.root_url}/books")
        initial_book = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[3]/a[1]/div')
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[2]/div[1]/button').click()
        new_book = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[3]/a[1]/div')
        assert initial_book != new_book

        # Search From Book page
        self.driver.get(f"{self.root_url}/books")
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[1]/div/div/input').send_keys("fiction")
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[1]/div/button').click()
        assert f"{self.root_url}/search/q=fiction/model=book" in self.driver.current_url

    def test_authors(self):
        self.driver.get(f"{self.root_url}/authors")
        self.driver.implicitly_wait(self.wait_time)
        # test clicking on item
        self.driver.find_element_by_xpath('//*[@id="MUIDataTableBodyRow-0"]').click()
        assert f"{self.root_url}/author/0" in self.driver.current_url

        # Sort by First Name
        self.driver.get(f"{self.root_url}/authors")
        initial_author = self.driver.find_element_by_xpath('//*[@id="MUIDataTableBodyRow-0"]/td[1]/div[2]').text
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[2]/div[3]/table/thead/tr/th[1]/span/button').click()
        new_author = self.driver.find_element_by_xpath('//*[@id="MUIDataTableBodyRow-23"]/td[1]/div[2]').text
        assert initial_author != new_author

        # Search From Author page
        self.driver.get(f"{self.root_url}/authors")
        self.driver.find_element_by_xpath('/html/body/div/div/div/div[1]/div/div/input').send_keys("fiction")
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[1]/div/button').click()
        assert f"{self.root_url}/search/q=fiction/model=author" in self.driver.current_url

    def test_quotes(self):
        self.driver.get(f"{self.root_url}/quotes")
        self.driver.implicitly_wait(self.wait_time)
        # test clicking on item
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[3]/a[1]/div').click()
        assert f"{self.root_url}/quote/0" in self.driver.current_url

        # Sort by Quote
        self.driver.get(f"{self.root_url}/quotes")
        initial_quote = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[3]/a[1]/div/div/div[1]/div/h5').text
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[2]/div[1]/button').click()
        new_quote = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[3]/a[1]/div/div/div[1]/div/h5').text
        assert initial_quote != new_quote

        # Search From Quote page
        self.driver.find_element_by_xpath('/html/body/div/div/div/div[1]/div/div/input').send_keys("fiction")
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[1]/div/button').click()
        assert f"{self.root_url}/search/q=fiction/model=quote" in self.driver.current_url

    def test_book_instance(self):
        self.driver.get(f"{self.root_url}/book/0")
        self.driver.implicitly_wait(self.wait_time)
        # Check title
        title = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[1]/div[1]/div/h1').text
        assert "The Kill Order" in self.driver.page_source
        # Check author
        author = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[1]/div[1]/div/h3').text
        assert "James Dashner" in author

    def test_author_instance(self):
        # Check title
        self.driver.get(f"{self.root_url}/author/0")
        self.driver.implicitly_wait(self.wait_time)
        title = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[1]/div[1]/div/h1').text
        assert "James Dashner" in title
        
        # Check books
        book = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[2]/div[1]/a[1]/div/div/div[1]/div/div/h4').text
        assert "The Kill Order" in book

        # Check quotes
        quote = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[2]/div[2]/a/div/div/div[1]/div/h5').text
        assert "I felt her absence." in quote

    def test_quote_instance(self):
        # Check title
        self.driver.get(f"{self.root_url}/quote/0")
        self.driver.implicitly_wait(self.wait_time)
        title = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[1]/div[1]/div/h1').text
        assert "I felt her absence." in title
        
        # Check author
        author = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[1]/div[1]/div/a/h3').text
        assert "James Dashner" in author

        # Check book
        book = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[2]/div/a[1]/div/div/div[1]/div/div/h4').text
        assert "The Kill Order" in book

    # TODO: Fix
    def test_search_page(self):
        self.driver.get(f"{self.root_url}/search/q=fiction/model=all")
        self.driver.implicitly_wait(self.wait_time)

        title = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[1]/h1').text
        assert "Search Results:" in title

        search_text = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[1]/h1/u').text
        assert "fiction" in search_text

        book_title = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[3]/div[1]/h2').text
        assert "Book Results" in book_title

        author_title = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[5]/div[1]/h2').text
        assert "Author Results" in author_title

        quote_title = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[7]/div[1]/h2').text
        assert "Quote Results" in quote_title


    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
