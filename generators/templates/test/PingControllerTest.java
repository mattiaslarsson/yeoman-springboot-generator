package <%=groupId%>.rest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.CoreMatchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = Application.class)
@WebMvcTest(PingController.class)
public class PingControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Test
  public void pingControllerShouldRespondWithSuppliedMessage() throws Exception {
    String message = "pong";

    this.mockMvc.perform(get("/ping/" + message))
        .andExpect(status().isOk())
        .andExpect(content().string(containsString(message)));
  }

  @Test
  public void pingControllerShouldResponseWith404() throws Exception {
    String message = "";

    this.mockMvc.perform(get("/ping/" + message))
        .andExpect(status().is(HttpStatus.NOT_FOUND.value()));
  }
}