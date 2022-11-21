package ac.myfinances.rest.model;

import java.math.BigDecimal;
import java.util.Objects;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;


import org.hibernate.annotations.GenericGenerator;
/**
 * Account
 */
@javax.annotation.Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2022-11-10T22:47:30.445-05:00[America/New_York]")
@Entity

public class Account  implements Serializable {
  private static final long serialVersionUID = 1L;


    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
  @JsonProperty("id")
  private String id;

  @JsonProperty("name")
  private String name;

  @JsonProperty("type")
  private String type;

  @JsonProperty("balance")
  private BigDecimal balance;

  @JsonProperty("rollover")
  private BigDecimal rollover;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "parent_id")
  @JsonProperty("parentCategory")
  private ParentCategory parentCategory;
  public Account id(String id) {
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

  public Account name(String name) {
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

  public Account type(String type) {
    this.type = type;
    return this;
  }


  /**
   * Get type
   * @return type
  */
  @ApiModelProperty(value = "")


  public String getType() {
    return this.type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public Account balance(BigDecimal balance) {
    this.balance = balance;
    return this;
  }


  /**
   * Get balance
   * @return balance
  */
  @ApiModelProperty(value = "")


  public BigDecimal getBalance() {
    return this.balance;
  }

  public void setBalance(BigDecimal balance) {
    this.balance = balance;
  }

  public Account rollover(BigDecimal rollover) {
    this.rollover = rollover;
    return this;
  }


  /**
   * Get balance
   * @return balance
   */
  @ApiModelProperty(value = "")


  public BigDecimal getRollover() {
    return this.rollover;
  }

  public void setRollover(BigDecimal rollover) {
    this.rollover = rollover;
  }

  public Account parentCategory(ParentCategory parentCategory) {
    this.parentCategory = parentCategory;
    return this;
  }


  /**
   * Get parentCategory
   * @return parentCategory
  */
  @ApiModelProperty(value = "")


  public ParentCategory getParentCategory() {
    return this.parentCategory;
  }

  public void setParentCategory(ParentCategory parentCategory) {
    this.parentCategory = parentCategory;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Account account = (Account) o;
    return Objects.equals(this.id, account.id) &&
        Objects.equals(this.name, account.name) &&
        Objects.equals(this.type, account.type) &&
        Objects.equals(this.balance, account.balance) &&
        Objects.equals(this.rollover, account.rollover) &&
        Objects.equals(this.parentCategory, account.parentCategory);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, type, balance, rollover, parentCategory);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Account {\n");
    
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    type: ").append(toIndentedString(type)).append("\n");
    sb.append("    balance: ").append(toIndentedString(balance)).append("\n");
    sb.append("    rollover: ").append(toIndentedString(rollover)).append("\n");
    sb.append("    parentCategory: ").append(toIndentedString(parentCategory)).append("\n");
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

