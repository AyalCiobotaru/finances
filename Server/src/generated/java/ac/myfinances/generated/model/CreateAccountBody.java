package ac.myfinances.generated.model;

import java.util.Objects;
import javax.persistence.Entity;
import ac.myfinances.generated.model.TypeEnum;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.openapitools.jackson.nullable.JsonNullable;
import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Convert;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.ManyToMany;
import javax.persistence.MappedSuperclass;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.*;
import com.fasterxml.jackson.annotation.*;



/**
 * CreateAccountBody
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2022-11-06T20:19:28.485692-05:00[America/New_York]")

public class CreateAccountBody  implements Serializable {
  private static final long serialVersionUID = 1L;



  @JsonProperty("name")
  private String name;



  @JsonProperty("type")
  private TypeEnum type;



  @JsonProperty("parentCategory")
  private String parentCategory;



  @JsonProperty("balance")
  private Float balance;

  public CreateAccountBody name(String name) {
    this.name = name;
    return this;
  }

  /**
   * Get name
   * @return name
  */
  @ApiModelProperty(value = "")


  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public CreateAccountBody type(TypeEnum type) {
    this.type = type;
    return this;
  }

  /**
   * Get type
   * @return type
  */
  @ApiModelProperty(value = "")

  @Valid

  public TypeEnum getType() {
    return type;
  }

  public void setType(TypeEnum type) {
    this.type = type;
  }

  public CreateAccountBody parentCategory(String parentCategory) {
    this.parentCategory = parentCategory;
    return this;
  }

  /**
   * Get parentCategory
   * @return parentCategory
  */
  @ApiModelProperty(value = "")


  public String getParentCategory() {
    return parentCategory;
  }

  public void setParentCategory(String parentCategory) {
    this.parentCategory = parentCategory;
  }

  public CreateAccountBody balance(Float balance) {
    this.balance = balance;
    return this;
  }

  /**
   * Get balance
   * @return balance
  */
  @ApiModelProperty(value = "")


  public Float getBalance() {
    return balance;
  }

  public void setBalance(Float balance) {
    this.balance = balance;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CreateAccountBody createAccountBody = (CreateAccountBody) o;
    return Objects.equals(this.name, createAccountBody.name) &&
        Objects.equals(this.type, createAccountBody.type) &&
        Objects.equals(this.parentCategory, createAccountBody.parentCategory) &&
        Objects.equals(this.balance, createAccountBody.balance);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, type, parentCategory, balance);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CreateAccountBody {\n");
    
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    type: ").append(toIndentedString(type)).append("\n");
    sb.append("    parentCategory: ").append(toIndentedString(parentCategory)).append("\n");
    sb.append("    balance: ").append(toIndentedString(balance)).append("\n");
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

