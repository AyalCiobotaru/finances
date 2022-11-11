package ac.myfinances.rest.model;

import java.util.Objects;
import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;


import org.hibernate.annotations.GenericGenerator;
/**
 * ParentCategory
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2022-11-10T22:47:30.445-05:00[America/New_York]")
@Entity

public class ParentCategory  implements Serializable {
  private static final long serialVersionUID = 1L;


    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
  @JsonProperty("id")
  private String id;

  @JsonProperty("name")
  private String name;
  public ParentCategory id(String id) {
    this.id = id;
    return this;
  }


  /**
   * Get id
   * @return id
  */
  @ApiModelProperty(value = "")


  public String getId() {
    return this.id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public ParentCategory name(String name) {
    this.name = name;
    return this;
  }


  /**
   * Get name
   * @return name
  */
  @ApiModelProperty(value = "")


  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ParentCategory parentCategory = (ParentCategory) o;
    return Objects.equals(this.id, parentCategory.id) &&
        Objects.equals(this.name, parentCategory.name);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ParentCategory {\n");
    
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

