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
        
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[2]/div/div[1]/div/div[2]/button/a').click()
        assert "https://booksforyou.me/books" in self.driver.current_url

        self.driver.get("https://booksforyou.me")
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[2]/div/div[2]/div/div[2]/button/a').click()
        assert "https://booksforyou.me/authors" in self.driver.current_url

        self.driver.get("https://booksforyou.me")
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[2]/div/div[3]/div/div[2]/button/a').click()
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
        commits = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[3]/h3[1]').text
        assert "Total Commits" in commits
        issues = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div[3]/h3[2]').text
        assert "Total Issues" in issues

    def test_books(self):
        self.driver.get("https://booksforyou.me/books")
        self.driver.implicitly_wait(20)
        # test clicking on item
        self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[1]/div/a').click()
        assert "https://booksforyou.me/book/0" in self.driver.current_url

        # self.driver.get("https://booksforyou.me/books")
        # self.driver.implicitly_wait(50)
        # test going to next page
        # element = self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[31]/nav/ul/li[2]')
        # actions = ActionChains(self.driver)

        # actions.move_to_element(element).click().perform()
        # self.driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[1]/div/a').click()
        # assert "https://booksforyou.me/book/26" in self.driver.current_url
        

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

    # def test_city_instance(self):
    #     self.driver.get("https://burninup.me/cities/id=3538")
    #     self.driver.implicitly_wait(15)
    #     # click on country link
    #     self.driver.find_elements_by_xpath(
    #         "/html/body/div/div/div[2]/div[3]/header/div[1]/h3[2]/a"
    #     )[0].click()
    #     assert "https://burninup.me/countries/id=206" in self.driver.current_url
    #     self.driver.get("https://burninup.me/cities/id=3538")
    #     # click on year of highest annual temperature link
    #     self.driver.find_elements_by_xpath(
    #         "/html/body/div/div/div[2]/div[1]/header/div/div[4]/div/a"
    #     )[0].click()
    #     assert "https://burninup.me/years/id=2013" in self.driver.current_url

    # def test_country_instance(self):
    #     self.driver.get("https://burninup.me/countries/id=1")
    #     self.driver.implicitly_wait(15)
    #     # test link to capital city
    #     self.driver.find_elements_by_xpath(
    #     "/html/body/div/div/div[2]/div[3]/header/div[6]/a")[0].click()
    #     assert "https://burninup.me/cities/id=3492" in self.driver.current_url
    #     self.driver.get("https://burninup.me/countries/id=1")
    #     # test link to year of highest emissions
    #     self.driver.find_elements_by_xpath(
    #         "/html/body/div/div/div[2]/div[1]/header/div/div[7]/div/a"
    #     )[0].click()
    #     assert "https://burninup.me/years/id=2007" in self.driver.current_url

    # def test_year_instance(self):
    #     # go to years instance page
    #     self.driver.get("https://burninup.me/years/id=1880")
    #     self.driver.implicitly_wait(15)
    #     # test links on years instance page
    #     self.driver.find_elements_by_xpath("/html/body/div/div/div[2]/div[1]"
    #     +"/header/div/div[7]/div/div/div[2]/table/tbody/tr[5]")[0].click()
    #     assert "https://burninup.me/cities/id=3132" in self.driver.current_url
    #     self.driver.get("https://burninup.me/years/id=1880")
    #     self.driver.find_elements_by_xpath("/html/body/div/div/div[2]/div[1]"+
    #     "/header/div/div[7]/div/div/div[2]/table/tbody/tr[1]")[0].click()
    #     assert "https://burninup.me/cities/id=1568" in self.driver.current_url

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
