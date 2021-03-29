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
        chrome_options.add_argument("--no-sandbox")
        self.driver = webdriver.Chrome(
            "./node_modules/chromedriver/bin/chromedriver", options=chrome_options
        )

    def test_landing(self):
        # test buttons on landing page
        self.driver.get("https://booksforyou.me")
        self.driver.implicitly_wait(20)
        assert self.driver.title == "Books For You"
        
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[3]/div/a[1]').click()
        assert "https://booksforyou.me/books" in self.driver.current_url

        self.driver.get("https://booksforyou.me")
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[3]/div/a[2]').click()
        assert "https://booksforyou.me/authors" in self.driver.current_url

        self.driver.get("https://booksforyou.me")
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[3]/div/a[3]').click()
        assert "https://booksforyou.me/quotes" in self.driver.current_url

    def test_navBar(self):
        self.driver.get("https://booksforyou.me")
        self.driver.find_element_by_xpath('//*[@id="root"]/div/nav/div/ul/li[1]/a').click()
        assert "https://booksforyou.me/about" in self.driver.current_url
        
        self.driver.find_element_by_xpath('//*[@id="root"]/div/nav/div/ul/li[2]/a').click()
        assert "https://booksforyou.me/books" in self.driver.current_url

        self.driver.find_element_by_xpath('//*[@id="root"]/div/nav/div/ul/li[3]/a').click()
        assert "https://booksforyou.me/authors" in self.driver.current_url

        self.driver.find_element_by_xpath('//*[@id="root"]/div/nav/div/ul/li[4]/a').click()
        assert "https://booksforyou.me/quotes" in self.driver.current_url

    def test_about(self):
        # go to about us page
        self.driver.get("https://booksforyou.me/about")
        self.driver.implicitly_wait(20)
        assert "about" in self.driver.current_url
        # verify title
        title = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[1]/h1[1]').text
        assert title == "About Us"
        # check different sections of the about page
        section = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[1]/h1[2]').text
        assert section == "Team"
        commits = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[3]/div[1]/h3[1]').text
        assert "Total Commits" in commits
        issues = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[3]/div[1]/h3[2]').text
        assert "Total Issues" in issues
        issues = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[3]/div[1]/h3[3]').text
        assert "Total Unit Tests" in issues

    # def test_books(self):
    #     self.driver.get("https://booksforyou.me/books")
    #     self.driver.implicitly_wait(20)
    #     # test clicking on item
    #     self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[1]/div/a').click()
    #     assert "https://booksforyou.me/book/0" in self.driver.current_url

    #     # self.driver.get("https://booksforyou.me/books")
    #     # self.driver.implicitly_wait(50)
    #     # test going to next page
    #     # element = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[31]/nav/ul/li[2]')
    #     # actions = ActionChains(self.driver)

    #     # actions.move_to_element(element).click().perform()
    #     # self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[1]/div/a').click()
    #     # assert "https://booksforyou.me/book/26" in self.driver.current_url
        

    def test_authors(self):
        self.driver.get("https://booksforyou.me/authors")
        self.driver.implicitly_wait(20)
        # test clicking on item
        self.driver.find_element_by_xpath('//*[@id="MUIDataTableBodyRow-0"]').click()
        assert "https://booksforyou.me/author/0" in self.driver.current_url

        # self.driver.get("https://booksforyou.me/books")
        # self.driver.implicitly_wait(50)

    def test_quotes(self):
        self.driver.get("https://booksforyou.me/quotes")
        self.driver.implicitly_wait(20)
        # test clicking on item
        self.driver.find_element_by_xpath('//*[@id="MUIDataTableBodyRow-0"]').click()
        assert "https://booksforyou.me/quote/0" in self.driver.current_url

        # self.driver.get("https://booksforyou.me/books")
        # self.driver.implicitly_wait(50)

    def test_book_instance(self):
        self.driver.get("https://booksforyou.me/book/0")
        self.driver.implicitly_wait(15)
        # click on author link
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[1]/div/a').click()
        assert "https://booksforyou.me/author/0" in self.driver.current_url
        self.driver.get("https://booksforyou.me/book/0")
        # click on quote link
        self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);") 
        self.driver.implicitly_wait(20)
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[2]/div/div/a/h3').click()
        assert "https://booksforyou.me/quote/0" in self.driver.current_url

    # def test_author_instance(self):
    #     self.driver.get("https://booksforyou.me/author/0")
    #     self.driver.implicitly_wait(15)
    #     # click on book link
    #     self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[2]/div[1]/div/a').click()
    #     assert "https://booksforyou.me/book/0" in self.driver.current_url
    #     self.driver.get("https://booksforyou.me/author/0")
    #     # click on quote link
    #     # element = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[3]/div/div/a/h3')
    #     # actions = ActionChains(self.driver)
    #     self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);") 
    #     self.driver.implicitly_wait(20)
    #     self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[3]/div/div/a/h3').click()
        
        print(self.driver.current_url)
        assert "https://booksforyou.me/quote/0" in self.driver.current_url

    # def test_quote_instance(self):
    #     self.driver.get("https://booksforyou.me/quote/0")
    #     self.driver.implicitly_wait(15)
    #     # click on author link
    #     self.driver.find_element_by_xpath('//*[@id="root"]/div/div/ul/li[1]/a').click()
    #     assert "https://booksforyou.me/author/0" in self.driver.current_url
    #     self.driver.get("https://booksforyou.me/quote/0")
    #     # click on book link
    #     self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);") 
    #     self.driver.implicitly_wait(20)
    #     self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[1]/div/a').click()
    #     assert "https://booksforyou.me/book/0" in self.driver.current_url

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
